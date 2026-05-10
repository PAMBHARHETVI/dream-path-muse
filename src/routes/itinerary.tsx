import { createFileRoute } from "@tanstack/react-router";
import { motion, Reorder } from "framer-motion";
import { useState } from "react";
import { GripVertical, MapPin, Plus, Calendar, DollarSign } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { itinerary as initialItinerary } from "@/lib/data";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/itinerary")({
  head: () => ({ meta: [{ title: "Itinerary Builder — Traveloop" }] }),
  component: () => (
    <AppShell title="Itinerary builder" subtitle="Drag to reorder. Click to add activities.">
      <Itinerary />
    </AppShell>
  ),
});

const typeColor: Record<string, string> = {
  Travel: "from-blue-500 to-cyan-400",
  Stay: "from-violet-500 to-purple-400",
  Food: "from-amber-500 to-rose-400",
  Culture: "from-emerald-500 to-teal-400",
  Nightlife: "from-fuchsia-500 to-pink-400",
};

function Itinerary() {
  const [days, setDays] = useState(initialItinerary);
  const totalCost = days.reduce((acc, d) => acc + d.items.reduce((s, i) => s + i.cost, 0), 0);

  return (
    <div className="space-y-6">
      {/* Top stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { l: "Days", v: days.length, icon: Calendar },
          { l: "Stops", v: new Set(days.map(d => d.city)).size, icon: MapPin },
          { l: "Activities", v: days.reduce((a, d) => a + d.items.length, 0), icon: Plus },
          { l: "Estimated", v: `$${totalCost}`, icon: DollarSign },
        ].map((s) => (
          <div key={s.l} className="glass rounded-2xl p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-aurora text-white flex items-center justify-center">
              <s.icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-lg font-semibold leading-tight">{s.v}</p>
              <p className="text-xs text-muted-foreground">{s.l}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Route line */}
      <div className="glass rounded-3xl p-6">
        <p className="text-xs uppercase tracking-widest text-primary font-medium mb-4">Route</p>
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
          {days.map((d, i) => (
            <div key={d.day} className="flex items-center gap-2 shrink-0">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.08 }}
                className="px-4 py-2 rounded-full bg-accent/60 text-sm font-medium flex items-center gap-2"
              >
                <span className="h-2 w-2 rounded-full bg-gradient-aurora animate-pulse-glow" />
                {d.city}
                <span className="text-muted-foreground text-xs">D{d.day}</span>
              </motion.div>
              {i < days.length - 1 && (
                <svg width="56" height="20" viewBox="0 0 56 20" className="text-primary">
                  <motion.path
                    d="M0 10 Q 28 -5 56 10"
                    stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="4 4"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: i * 0.1 }}
                  />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Day list - reorderable */}
      <Reorder.Group axis="y" values={days} onReorder={setDays} className="space-y-4">
        {days.map((day) => (
          <Reorder.Item key={day.day} value={day} className="list-none">
            <motion.div
              layout
              whileDrag={{ scale: 1.01, boxShadow: "var(--shadow-elegant)" }}
              className="glass rounded-3xl p-6 cursor-grab active:cursor-grabbing"
            >
              <div className="flex items-center gap-3 mb-4">
                <GripVertical className="h-4 w-4 text-muted-foreground" />
                <div className="h-10 w-10 rounded-xl bg-gradient-aurora text-white flex items-center justify-center text-sm font-semibold">
                  D{day.day}
                </div>
                <div>
                  <p className="font-semibold tracking-tight">{day.city}</p>
                  <p className="text-xs text-muted-foreground">{day.date}</p>
                </div>
                <div className="ml-auto text-sm text-muted-foreground">
                  {day.items.length} activities · ${day.items.reduce((s, i) => s + i.cost, 0)}
                </div>
              </div>

              <div className="ml-5 border-l border-dashed border-border pl-6 space-y-3">
                {day.items.map((it, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.04 }}
                    className="relative flex items-center gap-3 rounded-2xl p-3 bg-card/40 hover:bg-card/70 transition"
                  >
                    <span className={`absolute -left-[33px] top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-gradient-to-br ${typeColor[it.type]} ring-4 ring-background`} />
                    <span className="text-xs font-mono text-muted-foreground w-12">{it.time}</span>
                    <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-gradient-to-br ${typeColor[it.type]} text-white`}>{it.type}</span>
                    <span className="flex-1 text-sm font-medium">{it.title}</span>
                    <span className="text-sm tabular-nums">{it.cost ? `$${it.cost}` : "Free"}</span>
                  </motion.div>
                ))}
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground -ml-2">
                  <Plus className="h-3.5 w-3.5 mr-1" /> Add activity
                </Button>
              </div>
            </motion.div>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      <Button className="w-full bg-gradient-aurora text-white hover:opacity-90 h-12 rounded-2xl">
        <Plus className="h-4 w-4 mr-1" /> Add another day
      </Button>
    </div>
  );
}
