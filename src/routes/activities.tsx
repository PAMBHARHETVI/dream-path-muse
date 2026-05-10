import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Plus, Check, Compass, UtensilsCrossed, Landmark, Music } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { activities } from "@/lib/data";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/activities")({
  head: () => ({ meta: [{ title: "Activities — Traveloop" }] }),
  component: () => (
    <AppShell title="Activity search" subtitle="Curated experiences across every category.">
      <Activities />
    </AppShell>
  ),
});

const cats = [
  { name: "All", icon: Compass },
  { name: "Adventure", icon: Compass },
  { name: "Food", icon: UtensilsCrossed },
  { name: "Culture", icon: Landmark },
  { name: "Nightlife", icon: Music },
];

function Activities() {
  const [cat, setCat] = useState("All");
  const [added, setAdded] = useState<Set<string>>(new Set());
  const list = activities.filter(a => cat === "All" || a.category === cat);

  const toggle = (id: string) => {
    setAdded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2 overflow-x-auto scrollbar-none">
        {cats.map((c) => (
          <button
            key={c.name} onClick={() => setCat(c.name)}
            className={`relative shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${cat === c.name ? "text-white" : "text-muted-foreground hover:text-foreground glass"}`}
          >
            {cat === c.name && <motion.span layoutId="cat-pill" className="absolute inset-0 rounded-full bg-gradient-aurora shadow-glow" />}
            <span className="relative z-10 inline-flex items-center gap-2"><c.icon className="h-3.5 w-3.5" />{c.name}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((a, i) => {
          const isAdded = added.has(a.id);
          return (
            <motion.div
              key={a.id}
              layout
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              whileHover={{ y: -4 }}
              className="group glass rounded-3xl overflow-hidden shadow-soft"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={a.img} alt={a.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-3 left-3 glass rounded-full px-3 py-1 text-xs font-medium text-white">{a.category}</div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold">{a.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{a.city}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-semibold">{a.cost ? `$${a.cost}` : "Free"}</span>
                  <Button size="sm" onClick={() => toggle(a.id)}
                    className={isAdded ? "bg-success text-primary-foreground" : "bg-gradient-aurora text-white hover:opacity-90"}>
                    {isAdded ? <><Check className="h-3.5 w-3.5 mr-1" />Added</> : <><Plus className="h-3.5 w-3.5 mr-1" />Add</>}
                  </Button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
