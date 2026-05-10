import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Compass, LayoutDashboard, Map, Plane, PiggyBank, ListChecks,
  NotebookPen, Search, Globe2, Settings, Share2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/trips", label: "My Trips", icon: Plane },
  { to: "/trips/new", label: "Create Trip", icon: Compass },
  { to: "/itinerary", label: "Itinerary", icon: Map },
  { to: "/explore", label: "Explore Cities", icon: Globe2 },
  { to: "/activities", label: "Activities", icon: Search },
  { to: "/budget", label: "Budget", icon: PiggyBank },
  { to: "/packing", label: "Packing", icon: ListChecks },
  { to: "/journal", label: "Journal", icon: NotebookPen },
  { to: "/share", label: "Shared Trip", icon: Share2 },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function AppSidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-border/60 glass sticky top-0 h-screen p-4 gap-1">
      <Link to="/" className="flex items-center gap-2 px-3 py-4">
        <div className="h-9 w-9 rounded-xl bg-gradient-aurora shadow-glow flex items-center justify-center">
          <Compass className="h-5 w-5 text-white" />
        </div>
        <span className="font-semibold text-lg tracking-tight">Traveloop</span>
      </Link>
      <nav className="flex-1 mt-2 space-y-1 overflow-y-auto scrollbar-none">
        {items.map((item, i) => {
          const active = path === item.to || (item.to !== "/dashboard" && path.startsWith(item.to));
          const Icon = item.icon;
          return (
            <motion.div
              key={item.to}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <Link
                to={item.to}
                className={cn(
                  "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                  "text-muted-foreground hover:text-foreground hover:bg-accent/40",
                  active && "text-foreground bg-accent/60"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-xl bg-gradient-aurora opacity-20"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className="h-4 w-4 relative z-10" />
                <span className="relative z-10">{item.label}</span>
              </Link>
            </motion.div>
          );
        })}
      </nav>
      <div className="rounded-2xl p-4 glass-strong border border-border/60">
        <p className="text-xs text-muted-foreground">Pro Tip</p>
        <p className="text-sm font-medium mt-1">Drag stops on the itinerary to reorder your route.</p>
      </div>
    </aside>
  );
}
