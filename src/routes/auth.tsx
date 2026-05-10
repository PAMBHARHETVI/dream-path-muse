import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Compass } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Sign in — Traveloop" }] }),
  component: AuthLayout,
});

function AuthLayout() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const tabs = [
    { to: "/auth/login", label: "Sign in" },
    { to: "/auth/signup", label: "Create account" },
    { to: "/auth/forgot", label: "Forgot" },
  ];
  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-background/40 via-background/20 to-background/80" />
        <div className="absolute inset-0 bg-gradient-aurora opacity-30 mix-blend-overlay" />
        <div className="relative h-full flex flex-col justify-between p-10 text-white">
          <Link to="/" className="inline-flex items-center gap-2 w-fit">
            <div className="h-9 w-9 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center">
              <Compass className="h-5 w-5" />
            </div>
            <span className="font-semibold tracking-tight">Traveloop</span>
          </Link>
          <div>
            <h2 className="text-4xl font-semibold tracking-tight max-w-md text-balance">Wander wisely. Plan beautifully.</h2>
            <p className="mt-3 text-white/80 max-w-md">Join thousands of travelers building unforgettable journeys with Traveloop.</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="flex gap-1 glass rounded-full p-1 mb-6 w-fit">
            {tabs.map((t) => {
              const active = path === t.to;
              return (
                <Link key={t.to} to={t.to} className={`relative px-3 py-1.5 text-xs font-medium rounded-full transition ${active ? "text-white" : "text-muted-foreground hover:text-foreground"}`}>
                  {active && <motion.span layoutId="auth-tab" className="absolute inset-0 rounded-full bg-gradient-aurora shadow-glow" />}
                  <span className="relative z-10">{t.label}</span>
                </Link>
              );
            })}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={path} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
