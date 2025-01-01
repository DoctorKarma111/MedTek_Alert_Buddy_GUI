import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface MissionStats {
  responder: number;
  other: number;
  dispatcher: number;
}

interface MissionDistributionProps {
  stats: MissionStats;
  timeframe: string;
}

const timeframes = [
  "7 days",
  "30 days",
  "60 days",
  "90 days"
];

export function MissionDistribution({ stats, timeframe: defaultTimeframe }: MissionDistributionProps) {
  const [timeframe, setTimeframe] = useState(defaultTimeframe);
  const total = stats.responder + stats.other + stats.dispatcher;
  
  const getPercentage = (value: number) => {
    return ((value / total) * 100).toFixed(1);
  };

  const categories = [
    { 
      label: "Responder", 
      value: stats.responder,
      color: "bg-blue-500",
      textColor: "text-blue-500"
    },
    { 
      label: "Other", 
      value: stats.other,
      color: "bg-purple-500",
      textColor: "text-purple-500"
    },
    { 
      label: "Dispatcher", 
      value: stats.dispatcher,
      color: "bg-green-500",
      textColor: "text-green-500"
    }
  ];

  return (
    <Card className="border-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>MISSIONS</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              className="h-8 border-dashed"
            >
              {timeframe}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {timeframes.map((tf) => (
              <DropdownMenuItem
                key={tf}
                onClick={() => setTimeframe(tf)}
              >
                {tf}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            {categories.map(({ label, value, textColor }) => (
              <div key={label} className="text-center space-y-1">
                <div className={cn("text-4xl font-bold", textColor)}>
                  {value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {label}
                </div>
                <div className="text-xs font-medium">
                  {getPercentage(value)}%
                </div>
              </div>
            ))}
          </div>

          <div className="h-2 w-full rounded-full overflow-hidden flex">
            {categories.map(({ label, value, color }) => (
              <div
                key={label}
                className={cn("h-full transition-all duration-500", color)}
                style={{
                  width: `${getPercentage(value)}%`
                }}
              />
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="font-bold">{total}</div>
            <div className="text-muted-foreground">Total missions</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}