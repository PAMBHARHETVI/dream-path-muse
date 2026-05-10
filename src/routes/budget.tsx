import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AlertTriangle, TrendingUp, Wallet, Receipt } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { AppShell } from "@/components/app-shell";
import { budgetBreakdown, dailySpend } from "@/lib/data";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/budget")({
  head: () => ({ meta: [{ title: "Budget — Traveloop" }] }),
  component: () => (
    <AppShell title="Budget dashboard" subtitle="Stay on track. Spend confidently.">
      <Budget />
    </AppShell>
  ),
});

function Budget() {
  const total = budgetBreakdown.reduce((s, x) => s + x.value, 0);
  const cap = 4200;
  const colors = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { l: "Total budget", v: `$${cap.toLocaleString()}`, icon: Wallet },
          { l: "Spent", v: `$${total.toLocaleString()}`, icon: Receipt },
          { l: "Remaining", v: `$${(cap - total).toLocaleString()}`, icon: TrendingUp },
          { l: "Daily avg", v: "$284", icon: TrendingUp },
        ].map((s) => (
          <div key={s.l} className="glass rounded-2xl p-5">
            <div className="h-10 w-10 rounded-xl bg-gradient-aurora text-white flex items-center justify-center shadow-glow">
              <s.icon className="h-4 w-4" />
            </div>
            <p className="mt-4 text-2xl font-semibold">{s.v}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.l}</p>
          </div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl p-5 flex items-center gap-3 border-l-4 border-warning">
        <AlertTriangle className="h-5 w-5 text-warning" />
        <div className="flex-1">
          <p className="font-medium text-sm">You're 67% through your budget with 5 days left.</p>
          <p className="text-xs text-muted-foreground">Consider trimming dining costs to stay on plan.</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-3xl p-6">
          <h3 className="font-semibold tracking-tight">Cost breakdown</h3>
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={budgetBreakdown} dataKey="value" innerRadius={60} outerRadius={100} paddingAngle={3}>
                  {budgetBreakdown.map((_, i) => (<Cell key={i} fill={colors[i]} />))}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
            {budgetBreakdown.map((b, i) => (
              <div key={b.name} className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ background: colors[i] }} />
                <span className="text-muted-foreground">{b.name}</span>
                <span className="ml-auto font-medium tabular-nums">${b.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-3xl p-6">
          <h3 className="font-semibold tracking-tight">Daily spending</h3>
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailySpend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
                <Bar dataKey="amount" fill="var(--chart-1)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="glass rounded-3xl p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold tracking-tight">Overall progress</h3>
          <span className="text-sm text-muted-foreground">{Math.round((total / cap) * 100)}%</span>
        </div>
        <Progress value={(total / cap) * 100} className="h-3 mt-4" />
      </div>
    </div>
  );
}
