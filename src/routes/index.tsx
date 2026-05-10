import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Globe2, Map, Sparkles, Star, PiggyBank } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { destinations } from "@/lib/data";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Traveloop — Plan Your Dream Trip Effortlessly" },
      { name: "description", content: "Plan multi-city trips, build itineraries, track budgets, and share unforgettable journeys with Traveloop." },
      { property: "og:title", content: "Traveloop — Plan Your Dream Trip Effortlessly" },
      { property: "og:description", content: "Build immersive itineraries with stops, activities and budgets." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen w-full bg-background overflow-x-hidden">
      <Nav />
      <Hero />
      <Trending />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 glass border-b border-border/50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-gradient-aurora shadow-glow flex items-center justify-center">
            <Compass className="h-5 w-5 text-white" />
          </div>
          <span className="font-semibold text-lg tracking-tight">Traveloop</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#trending" className="hover:text-foreground transition">Destinations</a>
          <a href="#features" className="hover:text-foreground transition">Features</a>
          <Link to="/dashboard" className="hover:text-foreground transition">Dashboard</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/auth/login">
            <Button variant="ghost" size="sm">Sign in</Button>
          </Link>
          <Link to="/dashboard">
            <Button size="sm" className="bg-gradient-aurora hover:opacity-90 text-white shadow-glow">
              Start Planning
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative pt-40 pb-32 px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src={heroBg} alt="Santorini at golden hour" className="w-full h-full object-cover opacity-30 dark:opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
      </div>
      <div className="absolute -top-20 -left-32 w-[40rem] h-[40rem] rounded-full bg-gradient-aurora blur-3xl opacity-20 -z-10 animate-float" />
      <div className="absolute top-40 -right-24 w-[30rem] h-[30rem] rounded-full bg-primary/30 blur-3xl opacity-30 -z-10 animate-float" style={{ animationDelay: "2s" }} />

      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground mb-8"
        >
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          New — AI itinerary suggestions for every trip
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-balance"
        >
          Plan your dream trip <br />
          <span className="gradient-text">effortlessly.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance"
        >
          Map multi-city journeys, build day-by-day itineraries, and stay on budget — all in one beautiful workspace.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Link to="/dashboard">
            <Button size="lg" className="bg-gradient-aurora hover:opacity-95 text-white shadow-glow h-12 px-7 rounded-full text-base">
              Start planning <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/explore">
            <Button size="lg" variant="outline" className="h-12 px-7 rounded-full text-base glass">
              Explore destinations
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto"
        >
          {[
            { k: "120+", v: "Countries" },
            { k: "8K+", v: "Activities" },
            { k: "4.9★", v: "User Rating" },
            { k: "1M+", v: "Trips Planned" },
          ].map((s) => (
            <div key={s.v} className="glass rounded-2xl p-4">
              <p className="text-2xl font-semibold">{s.k}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.v}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Trending() {
  return (
    <section id="trending" className="px-6 py-24 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-xs font-medium text-primary uppercase tracking-widest mb-2">Trending now</p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">Where dreamers are going</h2>
        </div>
        <Link to="/explore" className="hidden md:inline-flex text-sm text-muted-foreground hover:text-foreground items-center gap-1">
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {destinations.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-3xl aspect-[4/5] cursor-pointer shadow-soft"
          >
            <img src={d.img} alt={d.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute top-4 left-4 glass rounded-full px-3 py-1 text-xs font-medium text-white">
              {d.tag}
            </div>
            <div className="absolute top-4 right-4 glass rounded-full px-3 py-1 text-xs font-medium text-white flex items-center gap-1">
              <Star className="h-3 w-3 fill-current" /> {d.popularity}
            </div>
            <div className="absolute bottom-0 inset-x-0 p-5 text-white">
              <p className="text-xs opacity-80">{d.country}</p>
              <h3 className="text-2xl font-semibold mt-0.5">{d.name}</h3>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm opacity-90">Budget {d.budget}</span>
                <span className="glass rounded-full px-3 py-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition">
                  Add to trip →
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { icon: Map, title: "Drag-and-drop itineraries", desc: "Reorder cities and activities with buttery smooth motion." },
    { icon: PiggyBank, title: "Live budget tracking", desc: "Stay on track with elegant analytics and alerts." },
    { icon: Globe2, title: "City discovery", desc: "Smart search across 8,000+ activities worldwide." },
    { icon: Sparkles, title: "Share beautifully", desc: "Public, read-only trip pages that feel like editorial." },
  ];
  return (
    <section id="features" className="px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-medium text-primary uppercase tracking-widest mb-2">Why Traveloop</p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-balance">Everything you need, nothing you don't</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="glass rounded-3xl p-6 hover-lift"
            >
              <div className="h-11 w-11 rounded-xl bg-gradient-aurora text-white flex items-center justify-center shadow-glow">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-semibold tracking-tight">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="px-6 pb-24">
      <div className="max-w-5xl mx-auto relative overflow-hidden rounded-[2rem] p-10 md:p-16 bg-gradient-aurora shadow-elegant">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-16 w-96 h-96 rounded-full bg-black/20 blur-3xl" />
        <div className="relative text-white max-w-xl">
          <h3 className="text-3xl md:text-5xl font-semibold tracking-tight">Your next adventure starts here.</h3>
          <p className="mt-3 text-white/85">Create your first trip in under a minute. No card required.</p>
          <div className="mt-7">
            <Link to="/trips/new">
              <Button size="lg" className="bg-white text-foreground hover:bg-white/90 h-12 px-7 rounded-full">
                Create your first trip <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 px-6 py-10">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-gradient-aurora flex items-center justify-center">
            <Compass className="h-4 w-4 text-white" />
          </div>
          <span>© 2026 Traveloop. Wander wisely.</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-foreground transition">Privacy</a>
          <a href="#" className="hover:text-foreground transition">Terms</a>
          <a href="#" className="hover:text-foreground transition">Contact</a>
        </div>
      </div>
    </footer>
  );
}
