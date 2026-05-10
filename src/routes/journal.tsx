import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Plus } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/journal")({
  head: () => ({ meta: [{ title: "Journal — Traveloop" }] }),
  component: () => (
    <AppShell title="Travel journal" subtitle="Your trip, in your own words.">
      <Journal />
    </AppShell>
  ),
});

const initial = [
  { day: "Day 1 · Tokyo", time: "11:42 PM", text: "Touched down at Haneda. The city feels electric — couldn't sleep after the ramen at Ichiran.", color: "from-amber-300/40 to-amber-500/30" },
  { day: "Day 2 · Tokyo", time: "10:18 PM", text: "Walked through Senso-ji at sunrise. Lanterns swayed in the breeze. teamLab Borderless was unreal.", color: "from-fuchsia-300/40 to-fuchsia-500/30" },
  { day: "Day 3 · Kyoto", time: "9:04 PM", text: "Fushimi Inari at dawn — alone with a thousand torii gates. Best moment of the trip so far.", color: "from-emerald-300/40 to-emerald-500/30" },
];

function Journal() {
  const [notes, setNotes] = useState(initial);
  const [draft, setDraft] = useState("");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        {notes.map((n, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14, rotate: i % 2 ? 0.6 : -0.4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className={`relative rounded-3xl p-6 bg-gradient-to-br ${n.color} backdrop-blur-xl border border-border/40 shadow-soft`}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">{n.day}</p>
              <p className="text-xs text-muted-foreground">{n.time}</p>
            </div>
            <p className="mt-3 text-base leading-relaxed">{n.text}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass rounded-3xl p-6 h-fit sticky top-24">
        <h3 className="font-semibold tracking-tight">New entry</h3>
        <Textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={6} placeholder="What happened today?" className="mt-3 bg-card/50" />
        <Button
          onClick={() => { if (draft.trim()) { setNotes([{ day: `Day ${notes.length + 1} · Tokyo`, time: "Just now", text: draft, color: "from-violet-300/40 to-fuchsia-500/30" }, ...notes]); setDraft(""); } }}
          className="w-full mt-3 bg-gradient-aurora text-white hover:opacity-90"
        >
          <Plus className="h-4 w-4 mr-1" />Add entry
        </Button>
      </div>
    </div>
  );
}
