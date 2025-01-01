import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, Activity } from "lucide-react";

interface StatusIconProps {
  type: 'success' | 'error' | 'activity';
  className?: string;
}

export function StatusIcon({ type, className }: StatusIconProps) {
  const baseClass = "h-4 w-4 animate-pulse";
  
  const icons = {
    success: <CheckCircle2 className={cn(baseClass, "text-secondary", className)} />,
    error: <XCircle className={cn(baseClass, "text-destructive", className)} />,
    activity: <Activity className={cn(baseClass, className)} />
  };

  return (
    <div className="relative">
      {icons[type]}
      <div className={cn(
        "absolute inset-0 rounded-full animate-ping opacity-75",
        type === 'success' && "bg-secondary",
        type === 'error' && "bg-destructive"
      )} />
    </div>
  );
}