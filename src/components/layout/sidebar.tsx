import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, LineChart, Settings, BookOpen } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  { name: "DASHBOARD", href: "/", icon: LayoutDashboard },
  { name: "MY STATS", href: "/stats", icon: LineChart },
  { name: "SETTINGS", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex h-full w-56 flex-col bg-card border-r shadow-md">
      <div className="flex h-16 items-center gap-2 px-4 bg-primary">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-lg bg-white flex items-center justify-center">
            <span className="text-primary font-bold text-xl">*</span>
          </div>
          <span className="font-bold text-white text-2xl tracking-wide">MEDTEK*</span>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link key={item.name} to={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-2 font-medium tracking-wide",
                  isActive && "bg-secondary text-white hover:bg-secondary/90"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Button>
            </Link>
          );
        })}
      </nav>
      <div className="px-2 pb-4 border-t border-border/50 shadow-[0_-1px_2px_rgba(0,0,0,0.05)]">
        <Link to="/guide">
          <Button
            variant={location.pathname === "/guide" ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start gap-2 font-medium tracking-wide mt-2",
              location.pathname === "/guide" && "bg-secondary text-white hover:bg-secondary/90"
            )}
          >
            <BookOpen className="h-4 w-4" />
            USER GUIDE
          </Button>
        </Link>
      </div>
    </div>
  );
}