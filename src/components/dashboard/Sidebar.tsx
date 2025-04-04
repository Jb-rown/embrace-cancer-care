
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  CalendarClock, 
  PieChart, 
  ClipboardList, 
  BookOpen, 
  HelpCircle, 
  Settings, 
  User,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface SidebarProps {
  role: "patient" | "caregiver" | "healthcare";
}

export const Sidebar = ({ role }: SidebarProps) => {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const links = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      roles: ["patient", "caregiver", "healthcare"],
    },
    {
      name: "Symptom Tracker",
      href: "/symptom-tracker",
      icon: PieChart,
      roles: ["patient", "caregiver"],
    },
    {
      name: "Treatment Plan",
      href: "/treatments",
      icon: ClipboardList,
      roles: ["patient", "caregiver", "healthcare"],
    },
    {
      name: "Appointments",
      href: "/appointments",
      icon: CalendarClock,
      roles: ["patient", "caregiver", "healthcare"],
    },
    {
      name: "Resources",
      href: "/resources",
      icon: BookOpen,
      roles: ["patient", "caregiver", "healthcare"],
    },
    {
      name: "Quiz",
      href: "/quiz",
      icon: HelpCircle,
      roles: ["patient", "caregiver"],
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
      roles: ["patient", "caregiver", "healthcare"],
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
      roles: ["patient", "caregiver", "healthcare"],
    },
  ];

  const filteredLinks = links.filter((link) => link.roles.includes(role));

  return (
    <div 
      className={cn(
        "h-screen bg-sidebar sticky top-0 transition-all duration-300 border-r",
        expanded ? "w-64" : "w-20"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b">
        <div className={cn("flex items-center gap-2", !expanded && "justify-center w-full")}>
          {expanded && (
            <>
              <div className="h-6 w-6 rounded-full bg-embrace-400" />
              <span className="font-semibold">Embrace</span>
            </>
          )}
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn("p-1 h-7 w-7", !expanded && "hidden")} 
          onClick={() => setExpanded(false)}
        >
          <X className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn("p-1 h-7 w-7", expanded && "hidden")} 
          onClick={() => setExpanded(true)}
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-2 py-4">
        {filteredLinks.map((link) => (
          <Link key={link.href} to={link.href}>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "w-full justify-start px-4 py-6",
                isActive(link.href) ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                !expanded && "justify-center px-0"
              )}
            >
              <link.icon className="h-5 w-5 mr-2" />
              {expanded && <span>{link.name}</span>}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};
