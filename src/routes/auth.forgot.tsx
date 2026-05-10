import { createFileRoute, Link } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/auth/forgot")({
  component: Forgot,
});

function Forgot() {
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Reset your password</h1>
      <p className="text-sm text-muted-foreground mt-1">We'll email you a magic link.</p>
      <form className="mt-6 space-y-3">
        <div>
          <label className="text-sm text-muted-foreground">Email</label>
          <Input type="email" placeholder="you@traveloop.app" className="mt-1.5 bg-card/50" />
        </div>
        <Button type="button" className="w-full bg-gradient-aurora text-white hover:opacity-90 h-11">Send reset link</Button>
      </form>
      <div className="mt-4 text-xs text-center text-muted-foreground">
        Remembered? <Link to="/auth/login" className="text-foreground hover:underline">Sign in</Link>
      </div>
    </div>
  );
}
