import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomSlider } from "@/components/ui/custom-slider";
import { cn } from "@/lib/utils";

const brightnessLevels = [
  { max: 51, label: "Don't wake my SO", color: "bg-secondary/20" },
  { max: 102, label: "Business as usual", color: "bg-secondary/40" },
  { max: 153, label: "Getting serious", color: "bg-secondary/60" },
  { max: 204, label: "Ok. This is BRIGHT", color: "bg-secondary/80" },
  { max: 255, label: "DUDE. wth", color: "bg-primary" },
];

function getBrightnessLabel(value: number): { label: string; color: string } {
  const level = brightnessLevels.find(level => value <= level.max);
  return level || brightnessLevels[brightnessLevels.length - 1];
}

function getSliderColor(value: number): string {
  const teal = { r: 20, g: 184, b: 166 };
  const red = { r: 255, g: 0, b: 0 };
  
  if (value <= 51) {
    // Black to teal
    const percent = value / 51;
    return `rgb(${percent * teal.r}, ${percent * teal.g}, ${percent * teal.b})`;
  } else if (value <= 153) {
    // Full teal
    return `rgb(${teal.r}, ${teal.g}, ${teal.b})`;
  } else if (value <= 204) {
    // Teal to red
    const percent = (value - 153) / 51;
    return `rgb(
      ${teal.r + (red.r - teal.r) * percent},
      ${teal.g + (red.g - teal.g) * percent},
      ${teal.b + (red.b - teal.b) * percent}
    )`;
  } else {
    // Red to white
    const percent = (value - 204) / 51;
    return `rgb(
      ${red.r},
      ${red.g + percent * 255},
      ${red.b + percent * 255}
    )`;
  }
}

interface BrightnessControlProps {
  onBrightnessChange: (value: number) => void;
}

export function BrightnessControl({ onBrightnessChange }: BrightnessControlProps) {
  const [brightness, setBrightness] = useState(102);
  const [showValue, setShowValue] = useState(false);
  const [valuePosition, setValuePosition] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const { label, color } = getBrightnessLabel(brightness);

  useEffect(() => {
    if (sliderRef.current) {
      const percent = (brightness / 255) * 100;
      const sliderWidth = sliderRef.current.offsetWidth;
      setValuePosition((percent * sliderWidth) / 100);
    }
  }, [brightness]);

  return (
    <Card className="mt-6 border-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Buddy Brightness Level</CardTitle>
        <div className={cn("px-3 py-1 rounded-full text-sm font-medium", color)}>
          {label}
        </div>
      </CardHeader>
      <CardContent>
        <div className="pt-4 relative" ref={sliderRef}>
          {showValue && (
            <div
              className="absolute -top-6 transform -translate-x-1/2 bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-sm font-medium shadow-md"
              style={{ left: `${valuePosition}px` }}
            >
              {brightness}
            </div>
          )}
          <CustomSlider
            value={[brightness]}
            max={255}
            step={1}
            sliderColor={getSliderColor(brightness)}
            onValueChange={([value]) => {
              setBrightness(value);
              setShowValue(true);
              onBrightnessChange(value);
            }}
            onValueCommit={() => {
              setTimeout(() => setShowValue(false), 1000);
            }}
            className="py-4"
          />
          <div className="flex justify-between mt-2 px-1">
            {brightnessLevels.map((level) => (
              <div
                key={level.label}
                className="flex flex-col items-center"
                style={{ width: '2px' }}
              >
                <div 
                  className={cn(
                    "h-2 w-0.5",
                    "bg-secondary",
                    brightness <= level.max ? "opacity-100" : "opacity-30"
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}