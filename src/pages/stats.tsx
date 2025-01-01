import { LevelProgress } from "@/components/stats/level-progress";
import { MissionDistribution } from "@/components/stats/mission-distribution";
import { MissionBreakdown } from "@/components/stats/mission-breakdown";

const mockStats = {
  level: {
    current: 4,
    section: "1",
    missions: 126,
    progress: 84,
  },
  missions: {
    responder: 93,
    other: 42,
    dispatcher: 23,
  },
  breakdown: {
    total: 158,
    success: 126,
    failed: 9,
    noContact: 2,
    refused: 0,
    aborted: 12,
    serverError: 9,
    cancelled: 0,
  },
};

export function Stats() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Stats</h1>
      
      <div className="grid gap-6">
        <LevelProgress {...mockStats.level} />
        
        <div className="grid md:grid-cols-2 gap-6">
          <MissionDistribution stats={mockStats.missions} timeframe="7 days" />
          <MissionBreakdown stats={mockStats.breakdown} missionType="Responder" />
        </div>
      </div>
    </div>
  );
}