import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface MissionBreakdownStats {
  total: number;
  success: number;
  failed: number;
  noContact: number;
  refused: number;
  aborted: number;
  serverError: number;
  cancelled: number;
}

interface MissionBreakdownProps {
  stats: MissionBreakdownStats;
  missionType: string;
}

const missionTypes = [
  "Responder",
  "Dispatch",
  "Training"
];

const COLORS = {
  success: "#0ea5e9",      // sky-500
  failed: "#ef4444",       // red-500
  noContact: "#eab308",    // yellow-500
  refused: "#f97316",      // orange-500
  aborted: "#dc2626",      // red-600
  serverError: "#a855f7",  // purple-500
  cancelled: "#6b7280"     // gray-500
};

export function MissionBreakdown({ stats, missionType: defaultType }: MissionBreakdownProps) {
  const [missionType, setMissionType] = useState(defaultType);
  
  const data = [
    { name: "Success", value: stats.success, color: COLORS.success },
    { name: "Failed", value: stats.failed, color: COLORS.failed },
    { name: "No Contact", value: stats.noContact, color: COLORS.noContact },
    { name: "Refused", value: stats.refused, color: COLORS.refused },
    { name: "Aborted", value: stats.aborted, color: COLORS.aborted },
    { name: "Server Error", value: stats.serverError, color: COLORS.serverError },
    { name: "Cancelled", value: stats.cancelled, color: COLORS.cancelled }
  ].filter(item => item.value > 0);

  const successRate = ((stats.success / stats.total) * 100).toFixed(1);

  return (
    <Card className="border-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>MISSION BREAKDOWN</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              className="h-8 border-dashed"
            >
              {missionType}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {missionTypes.map((type) => (
              <DropdownMenuItem
                key={type}
                onClick={() => setMissionType(type)}
              >
                {type}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-[300px] relative">
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <div className="text-4xl font-bold">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total missions</div>
            <div className="text-secondary font-medium mt-1">{successRate}% Success</div>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                animationBegin={0}
                animationDuration={1000}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    strokeWidth={2}
                    stroke={entry.color}
                  />
                ))}
              </Pie>
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-background/95 border rounded-lg shadow-lg p-2 text-sm">
                        <div className="font-medium">{data.name}</div>
                        <div className="text-muted-foreground">
                          {data.value} missions ({((data.value / stats.total) * 100).toFixed(1)}%)
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-4 gap-2 text-center text-sm">
          {data.map(({ name, value, color }) => (
            <StatusCount 
              key={name}
              label={name} 
              count={value} 
              color={color}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function StatusCount({ 
  label, 
  count, 
  color 
}: { 
  label: string; 
  count: number; 
  color: string;
}) {
  return (
    <div className="space-y-1">
      <div className="font-bold" style={{ color }}>
        {count}
      </div>
      <div className="text-muted-foreground text-xs">
        {label}
      </div>
    </div>
  );
}