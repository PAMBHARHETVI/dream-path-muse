import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Plane, TrendingUp, Wallet, MapPin, Plus, ArrowRight } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { trips, destinations } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Traveloop" }] }),
  component: () => (
    <AppShell title="Welcome back, Alex" subtitle="Here's what's happening with your adventures.">
      <Dashboard />
    </AppShell>
  ),
});

function Dashboard() {
  const stats = [
    { label: "Active trips", value: "2", icon: Plane, accent: "from-violet-500 to-fuchsia-500" },
    { label: "Total budget", value: "$16.5K", icon: Wallet, accent: "from-blue-500 to-cyan-400" },
    { label: "Cities planned", value: "11", icon: MapPin, accent: "from-emerald-500 to-teal-400" },
    { label: "Days on the road", value: "43", icon: TrendingUp, accent: "from-amber-500 to-rose-400" },
  ];
  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="glass rounded-2xl p-5 hover-lift"
          >
            <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${s.accent} flex items-center justify-center text-white shadow-glow`}>
              <s.icon className="h-5 w-5" />
            </div>
            <p className="mt-4 text-2xl font-semibold tracking-tight">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent trips */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight">Recent trips</h2>
            <Link to="/trips" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trips.slice(0, 4).map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-2xl glass shadow-soft"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img src={t.cover} alt={t.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{t.name}</h3>
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent text-accent-foreground">{t.status}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{t.dates} · {t.cities.join(" → ")}</p>
                  <div className="mt-3">
                    <div className="flex justify-between text-[11px] text-muted-foreground mb-1">
                      <span>Budget</span><span>${t.spent.toLocaleString()} / ${t.budget.toLocaleString()}</span>
                    </div>
                    <Progress value={(t.spent / t.budget) * 100} className="h-1.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick actions + budget */}
        <div className="space-y-4">
          <div className="glass rounded-2xl p-5">
            <h3 className="font-semibold tracking-tight">Quick actions</h3>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Link to="/trips/new"><Button className="w-full bg-gradient-aurora text-white hover:opacity-90"><Plus className="h-4 w-4 mr-1" />New trip</Button></Link>
              <Link to="/itinerary"><Button variant="outline" className="w-full">Build day</Button></Link>
              <Link to="/budget"><Button variant="outline" className="w-full">Budget</Button></Link>
              <Link to="/packing"><Button variant="outline" className="w-full">Packing</Button></Link>
            </div>
          </div>

          <div className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold tracking-tight">Budget summary</h3>
              <Link to="/budget" className="text-xs text-muted-foreground hover:text-foreground">Details</Link>
            </div>
            <p className="mt-4 text-3xl font-semibold">$5,590<span className="text-sm text-muted-foreground font-normal"> / $16,500</span></p>
            <Progress value={34} className="h-2 mt-3" />
            <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs">
              {[
                { l: "Stay", v: "$1.2K" },{ l: "Food", v: "$640" },{ l: "Activities", v: "$480" },
              ].map((k) => (
                <div key={k.l} className="rounded-xl bg-accent/40 py-3">
                  <p className="font-semibold text-sm">{k.v}</p>
                  <p className="text-muted-foreground mt-0.5">{k.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trending carousel */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold tracking-tight">Trending cities</h2>
          <Link to="/explore" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
            Explore all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none -mx-2 px-2">
          {destinations.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
              whileHover={{ y: -4 }}
              className="relative w-64 shrink-0 aspect-[4/5] rounded-2xl overflow-hidden shadow-soft"
            >
              <img src={d.img} alt={d.name} loading="lazy" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-4 text-white">
                <p className="text-xs opacity-80">{d.country}</p>
                <p className="font-semibold">{d.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
