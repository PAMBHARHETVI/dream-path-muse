import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Search, Plus, Edit3, Copy, Trash2 } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { trips } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const Route = createFileRoute("/trips/")({
  head: () => ({ meta: [{ title: "My Trips — Traveloop" }] }),
  component: () => (
    <AppShell title="My Trips" subtitle="All your adventures in one place.">
      <MyTrips />
    </AppShell>
  ),
});

function MyTrips() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<string>("All");
  const filters = ["All", "Active", "Planning", "Completed"];
  const filtered = trips.filter(t =>
    (filter === "All" || t.status === filter) &&
    (t.name.toLowerCase().includes(q.toLowerCase()) || t.cities.join(" ").toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search trips by name or city…" className="pl-9 bg-card/50" />
        </div>
        <div className="flex gap-2 glass rounded-full p-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition ${filter === f ? "text-white" : "text-muted-foreground hover:text-foreground"}`}
            >
              {filter === f && (
                <motion.span layoutId="trip-filter" className="absolute inset-0 rounded-full bg-gradient-aurora shadow-glow" />
              )}
              <span className="relative z-10">{f}</span>
            </button>
          ))}
        </div>
        <Link to="/trips/new">
          <Button className="bg-gradient-aurora text-white hover:opacity-90"><Plus className="h-4 w-4 mr-1" />New trip</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-3xl glass shadow-soft hover:shadow-glow transition-shadow"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img src={t.cover} alt={t.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg tracking-tight">{t.name}</h3>
                <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-accent text-accent-foreground">{t.status}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{t.dates} · {t.days} days</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {t.cities.map((c) => (
                  <span key={c} className="text-[11px] px-2 py-0.5 rounded-full bg-accent/60">{c}</span>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm"><span className="font-semibold">${t.budget.toLocaleString()}</span> <span className="text-muted-foreground">budget</span></p>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                  <Button size="icon" variant="ghost" className="h-8 w-8"><Edit3 className="h-3.5 w-3.5" /></Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8"><Copy className="h-3.5 w-3.5" /></Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
