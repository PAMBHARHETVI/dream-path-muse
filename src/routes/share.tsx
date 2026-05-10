import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Copy, Calendar, MapPin } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { itinerary, trips } from "@/lib/data";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/share")({
  head: () => ({ meta: [{ title: "Shared Trip — Traveloop" }] }),
  component: () => (
    <AppShell title="Shared trip" subtitle="A read-only public view of your itinerary.">
      <Shared />
    </AppShell>
  ),
});

function Shared() {
  const trip = trips[0];
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl overflow-hidden aspect-[21/9] shadow-elegant">
        <img src={trip.cover} alt={trip.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 p-8 text-white">
          <p className="text-xs uppercase tracking-widest opacity-80">Public itinerary</p>
          <h1 className="text-4xl md:text-5xl font-semibold mt-2 tracking-tight">{trip.name}</h1>
          <div className="mt-3 flex items-center gap-4 text-sm opacity-90">
            <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{trip.dates}</span>
            <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{trip.cities.join(" · ")}</span>
          </div>
        </div>
        <Button className="absolute top-6 right-6 bg-white text-foreground hover:bg-white/90 rounded-full">
          <Copy className="h-4 w-4 mr-1" />Copy trip
        </Button>
      </motion.div>

      <div className="space-y-4">
        {itinerary.map((d, i) => (
          <motion.div key={d.day}
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="glass rounded-3xl p-6"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-aurora text-white flex items-center justify-center font-semibold">D{d.day}</div>
              <div>
                <p className="font-semibold">{d.city}</p>
                <p className="text-xs text-muted-foreground">{d.date}</p>
              </div>
            </div>
            <ul className="mt-4 space-y-2">
              {d.items.map((it, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm">
                  <span className="w-12 text-xs font-mono text-muted-foreground">{it.time}</span>
                  <span className="flex-1">{it.title}</span>
                  <span className="text-muted-foreground tabular-nums">{it.cost ? `$${it.cost}` : "Free"}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
