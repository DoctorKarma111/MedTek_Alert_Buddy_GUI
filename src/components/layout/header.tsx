import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { User } from "@/types";

interface HeaderProps {
  user: User;
}

export function Header({ user }: HeaderProps) {
  return (
    <div className="h-16 border-b bg-card px-6 flex items-center justify-between shadow-lg">
      <h1 className="text-lg font-bold tracking-wide text-foreground">
        Alert Buddy a0.1
      </h1>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <div className="text-right">
          <p className="text-sm font-bold tracking-wide uppercase">{user.name}</p>
          <p className="text-xs text-muted-foreground uppercase">{user.rank}</p>
        </div>
        <Avatar className="border-2 border-primary">
          <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} />
          <AvatarFallback className="font-bold">{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}