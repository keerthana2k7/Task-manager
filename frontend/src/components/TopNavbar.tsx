import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CalendarDays, Bell, LogOut } from "lucide-react";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export function TopNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const initials = user?.name
    ? user.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="h-16 flex items-center justify-between border-b bg-card/80 backdrop-blur-sm px-4 md:px-6 sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="hover:bg-accent active:scale-95 transition-all duration-200" />
        <div className="hidden sm:flex items-center gap-2 text-muted-foreground text-sm">
          <CalendarDays className="h-4 w-4" />
          <span>{today}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <ThemeSwitcher />
        <button className="relative p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-all duration-200 active:scale-95">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-priority-high animate-pulse" />
        </button>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-foreground">{user?.name || "User"}</p>
            <p className="text-xs text-muted-foreground">{user?.email || ""}</p>
          </div>
          <Avatar className="h-9 w-9 ring-2 ring-primary/10 hover:ring-primary/30 transition-all duration-200 cursor-pointer">
            <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
          <button
            onClick={handleLogout}
            className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-all duration-200 active:scale-95"
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
