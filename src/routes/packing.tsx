import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { packingItems } from "@/lib/data";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/packing")({
  head: () => ({ meta: [{ title: "Packing — Traveloop" }] }),
  component: () => (
    <AppShell title="Packing checklist" subtitle="Tap to pack. We'll keep score.">
      <Packing />
    </AppShell>
  ),
});

function Packing() {
  const [items, setItems] = useState(packingItems);
  const grouped = useMemo(() => {
    return items.reduce<Record<string, typeof items>>((acc, it) => {
      (acc[it.category] ||= []).push(it);
      return acc;
    }, {});
  }, [items]);
  const packed = items.filter(i => i.packed).length;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="glass rounded-3xl p-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-primary font-medium">Progress</p>
            <h3 className="text-3xl font-semibold mt-1">{packed}<span className="text-muted-foreground">/{items.length}</span></h3>
          </div>
          <p className="text-sm text-muted-foreground">{Math.round((packed/items.length) * 100)}% packed</p>
        </div>
        <Progress value={(packed/items.length) * 100} className="h-2 mt-4" />
      </div>

      {Object.entries(grouped).map(([cat, list]) => (
        <div key={cat} className="glass rounded-3xl p-6">
          <h3 className="font-semibold tracking-tight mb-4">{cat}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <AnimatePresence>
              {list.map((it) => (
                <motion.button
                  layout key={it.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setItems(items.map(x => x.id === it.id ? { ...x, packed: !x.packed } : x))}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${it.packed ? "bg-success/15" : "bg-card/50 hover:bg-card"}`}
                >
                  <span className={`h-6 w-6 rounded-md flex items-center justify-center transition ${it.packed ? "bg-success text-primary-foreground" : "border border-border"}`}>
                    {it.packed && <Check className="h-3.5 w-3.5" />}
                  </span>
                  <span className={`text-sm ${it.packed ? "line-through text-muted-foreground" : ""}`}>{it.name}</span>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>
      ))}
    </div>
  );
}
