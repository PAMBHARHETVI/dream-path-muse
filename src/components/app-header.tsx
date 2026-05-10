import { Moon, Sun, Bell, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/lib/theme";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AppHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  const { theme, toggle } = useTheme();
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-30 glass border-b border-border/60 px-6 py-4 flex items-center gap-4"
    >
      <div className="min-w-0">
        <h1 className="text-xl font-semibold tracking-tight truncate">{title}</h1>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5 truncate">{subtitle}</p>}
      </div>
      <div className="ml-auto flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search trips, cities, activities…" className="pl-9 w-72 bg-card/50" />
        </div>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full" onClick={toggle} aria-label="Toggle theme">
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        <div className="h-9 w-9 rounded-full bg-gradient-aurora shadow-glow ring-2 ring-background flex items-center justify-center text-white text-sm font-semibold">
          AS
        </div>
      </div>
    </motion.header>
  );
}
