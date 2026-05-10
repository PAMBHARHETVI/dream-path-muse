import { createFileRoute, Link } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/auth/signup")({
  component: Signup,
});

function Signup() {
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Create your account</h1>
      <p className="text-sm text-muted-foreground mt-1">Start planning your dream trip in 30 seconds.</p>
      <form className="mt-6 space-y-3">
        <div>
          <label className="text-sm text-muted-foreground">Full name</label>
          <Input placeholder="Alex Sterling" className="mt-1.5 bg-card/50" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Email</label>
          <Input type="email" placeholder="you@traveloop.app" className="mt-1.5 bg-card/50" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Password</label>
          <Input type="password" placeholder="••••••••" className="mt-1.5 bg-card/50" />
        </div>
        <Link to="/dashboard"><Button type="button" className="w-full bg-gradient-aurora text-white hover:opacity-90 h-11">Create account</Button></Link>
      </form>
    </div>
  );
}
