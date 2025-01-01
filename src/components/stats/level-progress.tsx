import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface LevelProgressProps {
  level: number;
  section: string;
  missions: number;
  progress: number;
}

export function LevelProgress({ level, section, missions, progress }: LevelProgressProps) {
  return (
    <Card className="border-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-2xl">Level {level}</CardTitle>
          <p className="text-sm text-muted-foreground">Section {section}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-sm text-muted-foreground">{missions} successful missions</div>
          <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
            <span className="text-secondary-foreground font-bold">{level}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{progress}%</span>
            <span className="text-muted-foreground">150</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}