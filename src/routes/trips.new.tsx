import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { destinations } from "@/lib/data";

export const Route = createFileRoute("/trips/new")({
  head: () => ({ meta: [{ title: "Create Trip — Traveloop" }] }),
  component: () => (
    <AppShell title="Create a new trip" subtitle="Four quick steps. We'll handle the rest.">
      <CreateTrip />
    </AppShell>
  ),
});

const steps = ["Name your trip", "Pick your dates", "Add a description", "Choose a cover"];

function CreateTrip() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ name: "", start: "", end: "", desc: "", cover: destinations[0].id });

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-10">
        {steps.map((s, i) => (
          <div key={s} className="flex-1">
            <div className={`h-1.5 rounded-full transition-colors ${i <= step ? "bg-gradient-aurora" : "bg-muted"}`} />
            <p className={`mt-2 text-xs ${i === step ? "text-foreground font-medium" : "text-muted-foreground"}`}>
              Step {i + 1}
            </p>
          </div>
        ))}
      </div>

      <div className="glass rounded-3xl p-8 md:p-10 shadow-soft min-h-[420px] flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="flex-1"
          >
            <p className="text-xs uppercase tracking-widest text-primary font-medium">Step {step + 1} of {steps.length}</p>
            <h2 className="text-3xl font-semibold tracking-tight mt-2">{steps[step]}</h2>

            <div className="mt-8 space-y-4">
              {step === 0 && (
                <>
                  <Input
                    autoFocus value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    placeholder="e.g. Japan Discovery 2026"
                    className="h-14 text-lg bg-card/50"
                  />
                  <p className="text-sm text-muted-foreground">Give your adventure a name you'll smile at later.</p>
                </>
              )}
              {step === 1 && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Start date</label>
                    <Input type="date" value={data.start} onChange={(e) => setData({ ...data, start: e.target.value })} className="h-12 mt-1.5 bg-card/50" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">End date</label>
                    <Input type="date" value={data.end} onChange={(e) => setData({ ...data, end: e.target.value })} className="h-12 mt-1.5 bg-card/50" />
                  </div>
                </div>
              )}
              {step === 2 && (
                <Textarea
                  value={data.desc} onChange={(e) => setData({ ...data, desc: e.target.value })}
                  rows={6} placeholder="A two-week ramen pilgrimage through Tokyo, Kyoto and Osaka…"
                  className="text-base bg-card/50"
                />
              )}
              {step === 3 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {destinations.map((d) => (
                    <button
                      key={d.id} onClick={() => setData({ ...data, cover: d.id })}
                      className={`relative aspect-[4/3] rounded-2xl overflow-hidden ring-2 transition ${data.cover === d.id ? "ring-primary shadow-glow" : "ring-transparent hover:ring-border"}`}
                    >
                      <img src={d.img} alt={d.name} loading="lazy" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <span className="absolute bottom-2 left-3 text-white text-sm font-medium">{d.name}</span>
                      {data.cover === d.id && (
                        <span className="absolute top-2 right-2 h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-between">
          <Button variant="ghost" disabled={step === 0} onClick={() => setStep(step - 1)}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          {step < steps.length - 1 ? (
            <Button onClick={() => setStep(step + 1)} className="bg-gradient-aurora text-white hover:opacity-90">
              Continue <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            <Link to="/itinerary">
              <Button className="bg-gradient-aurora text-white hover:opacity-90">
                Create trip <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
