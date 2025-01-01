import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PresetButton } from "@/types";
import { cn } from "@/lib/utils";

const presets: PresetButton[] = [
  { id: 1, name: "#1", description: "Standard alert pattern", color: "bg-secondary" },
  { id: 2, name: "#2", description: "Rapid red flashing", color: "bg-destructive" },
  { id: 3, name: "#3", description: "Yellow pulsing", color: "bg-yellow-500" },
  { id: 4, name: "#4", description: "Green confirmation", color: "bg-green-500" },
  { id: 5, name: "#5", description: "Blue notification", color: "bg-blue-500" },
  { id: 6, name: "#6", description: "Purple ambient", color: "bg-purple-500" },
  { id: 7, name: "#7", description: "Orange alert", color: "bg-orange-500" },
  { id: 8, name: "#8", description: "Teal pattern", color: "bg-secondary" },
  { id: 9, name: "#9", description: "Pink highlight", color: "bg-pink-500" },
  { id: 10, name: "#10", description: "White strobe", color: "bg-gray-100" },
];

interface PresetSelectorProps {
  selectedPreset: number;
  onPresetSelect: (id: number) => void;
}

export function PresetSelector({ selectedPreset, onPresetSelect }: PresetSelectorProps) {
  return (
    <Card className="mt-6 border-2">
      <CardHeader>
        <CardTitle>Default Emergency Preset</CardTitle>
        <CardDescription>
          Select a default preset for emergencies
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {presets.map((preset) => (
            <Button
              key={preset.id}
              variant="outline"
              className={cn(
                "h-24 flex flex-col items-center justify-center gap-2 relative overflow-hidden border-2",
                selectedPreset === preset.id && "border-primary"
              )}
              onClick={() => onPresetSelect(preset.id)}
            >
              <div
                className={cn(
                  "absolute top-0 left-0 w-full h-1",
                  preset.color
                )}
              />
              <span className="font-medium">{preset.name}</span>
              <span className="text-xs text-muted-foreground">
                {preset.description}
              </span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}