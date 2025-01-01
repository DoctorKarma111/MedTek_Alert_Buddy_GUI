import { Check } from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface SlidingNotificationProps {
  message: string;
  isVisible: boolean;
  onHide: () => void;
}

export function SlidingNotification({ message, isVisible, onHide }: SlidingNotificationProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onHide();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onHide]);

  return (
    <div
      className={cn(
        "fixed left-1/2 -translate-x-1/2 top-16 z-50 transform transition-all duration-300 ease-in-out",
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      )}
    >
      <div className="bg-background border-2 border-primary/20 rounded-lg shadow-lg px-4 py-2 flex items-center gap-2">
        <Check className="w-5 h-5 text-secondary" />
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
}