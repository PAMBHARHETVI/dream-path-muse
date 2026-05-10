import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Search, MapPin, TrendingUp, DollarSign, Plus } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { destinations } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/explore")({
  head: () => ({ meta: [{ title: "Explore Cities — Traveloop" }] }),
  component: () => (
    <AppShell title="Explore cities" subtitle="Find your next stop. Add it in one tap.">
      <Explore />
    </AppShell>
  ),
});

function Explore() {
  const [q, setQ] = useState("");
  const list = destinations.filter(d => `${d.name} ${d.country}`.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="space-y-6">
      <div className="relative max-w-2xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search cities, countries, regions…" className="pl-11 h-14 text-base bg-card/50 rounded-2xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            whileHover={{ y: -4 }}
            className="group glass rounded-3xl overflow-hidden shadow-soft"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img src={d.img} alt={d.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute top-3 left-3 glass rounded-full px-3 py-1 text-xs font-medium text-white">{d.tag}</div>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{d.name}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" />{d.country}</p>
                </div>
                <Button size="sm" className="bg-gradient-aurora text-white hover:opacity-90 rounded-full">
                  <Plus className="h-3.5 w-3.5 mr-1" />Add
                </Button>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-xl bg-accent/40 p-3">
                  <p className="text-muted-foreground flex items-center gap-1"><TrendingUp className="h-3 w-3" /> Popularity</p>
                  <p className="font-semibold mt-1">{d.popularity}/100</p>
                </div>
                <div className="rounded-xl bg-accent/40 p-3">
                  <p className="text-muted-foreground flex items-center gap-1"><DollarSign className="h-3 w-3" /> Budget</p>
                  <p className="font-semibold mt-1">{d.budget}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
