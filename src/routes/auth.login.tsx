import { createFileRoute, Link } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/auth/login")({
  component: Login,
});

function Login() {
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
      <p className="text-sm text-muted-foreground mt-1">Sign in to continue planning.</p>
      <form className="mt-6 space-y-3">
        <div>
          <label className="text-sm text-muted-foreground">Email</label>
          <Input type="email" placeholder="you@traveloop.app" className="mt-1.5 bg-card/50" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Password</label>
          <Input type="password" placeholder="••••••••" className="mt-1.5 bg-card/50" />
        </div>
        <Link to="/dashboard"><Button type="button" className="w-full bg-gradient-aurora text-white hover:opacity-90 h-11">Sign in</Button></Link>
      </form>
      <div className="mt-4 text-xs text-center text-muted-foreground">
        New here? <Link to="/auth/signup" className="text-foreground hover:underline">Create an account</Link>
      </div>
    </div>
  );
}
