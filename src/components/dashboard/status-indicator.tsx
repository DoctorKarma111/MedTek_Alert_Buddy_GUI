import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusIcon } from "@/components/ui/status-icon";

interface StatusIndicatorProps {
  isBackendRunning: boolean;
  alertStatus: 'standby' | 'active';
}

export function StatusIndicator({ isBackendRunning, alertStatus }: StatusIndicatorProps) {
  return (
    <div className="space-y-4">
      <div className="max-w-md">
        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 py-3">
            <CardTitle className="text-sm font-bold tracking-wide uppercase">Buddy Status</CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">
                {isBackendRunning ? "Active" : "Offline"}
              </span>
              <StatusIcon type={isBackendRunning ? 'success' : 'error'} />
            </div>
          </CardHeader>
        </Card>
      </div>

      <Card className="border-2">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center gap-3">
            <CardTitle className="text-xl font-bold tracking-wide uppercase">Alert Status</CardTitle>
            <StatusIcon 
              type="activity" 
              className={alertStatus === 'active' ? 'text-destructive animate-pulse w-6 h-6' : 'text-secondary w-6 h-6'} 
            />
          </div>
          <Badge 
            variant={alertStatus === 'standby' ? "secondary" : "destructive"}
            className="text-white font-medium tracking-wide uppercase px-4 py-1"
          >
            {alertStatus === 'standby' ? "On Standby" : "Active Alert"}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          {alertStatus === 'active' && (
            <div className="space-y-2 bg-destructive/5 p-4 rounded-lg border border-destructive/20">
              <h4 className="font-bold text-destructive">Alert Information</h4>
              <div className="space-y-1 text-sm">
                <p className="text-muted-foreground">Location: Medical Bay 3</p>
                <p className="text-muted-foreground">Priority: High</p>
                <p className="text-muted-foreground">Type: Medical Emergency</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}