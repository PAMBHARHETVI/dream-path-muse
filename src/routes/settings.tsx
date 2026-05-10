import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AppShell } from "@/components/app-shell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { destinations } from "@/lib/data";
import { Heart } from "lucide-react";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — Traveloop" }] }),
  component: () => (
    <AppShell title="Profile & settings" subtitle="Make Traveloop feel like home.">
      <Settings />
    </AppShell>
  ),
});

function Settings() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-3xl p-6 lg:col-span-2 space-y-5">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-gradient-aurora shadow-glow flex items-center justify-center text-white text-xl font-semibold">AS</div>
          <div>
            <h3 className="font-semibold">Alex Sterling</h3>
            <p className="text-sm text-muted-foreground">alex@traveloop.app</p>
          </div>
          <Button variant="outline" className="ml-auto">Change avatar</Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted-foreground">Full name</label>
            <Input defaultValue="Alex Sterling" className="mt-1.5 bg-card/50" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Email</label>
            <Input defaultValue="alex@traveloop.app" className="mt-1.5 bg-card/50" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Home city</label>
            <Input defaultValue="San Francisco, USA" className="mt-1.5 bg-card/50" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Currency</label>
            <Input defaultValue="USD" className="mt-1.5 bg-card/50" />
          </div>
        </div>
        <Button className="bg-gradient-aurora text-white hover:opacity-90">Save changes</Button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="glass rounded-3xl p-6 space-y-4">
        <h3 className="font-semibold tracking-tight">Preferences</h3>
        {[
          { l: "Email digests", d: "Weekly inspiration in your inbox" },
          { l: "Trip reminders", d: "Notify before each trip" },
          { l: "Public profile", d: "Let others view your shared trips" },
          { l: "Auto-currency", d: "Convert prices to your home currency" },
        ].map((p, i) => (
          <div key={p.l} className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium">{p.l}</p>
              <p className="text-xs text-muted-foreground">{p.d}</p>
            </div>
            <Switch defaultChecked={i < 2} />
          </div>
        ))}
      </motion.div>

      <div className="glass rounded-3xl p-6 lg:col-span-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold tracking-tight">Saved destinations</h3>
          <span className="text-xs text-muted-foreground">{destinations.length} saved</span>
        </div>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {destinations.map((d) => (
            <motion.div key={d.id} whileHover={{ y: -3 }} className="relative aspect-square rounded-2xl overflow-hidden">
              <img src={d.img} alt={d.name} loading="lazy" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <Heart className="absolute top-2 right-2 h-4 w-4 text-white fill-white" />
              <p className="absolute bottom-2 left-2 text-white text-xs font-medium">{d.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
