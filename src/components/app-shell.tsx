import { Outlet } from "@tanstack/react-router";
import { AppSidebar } from "./app-sidebar";
import { AppHeader } from "./app-header";

export function AppShell({
  title, subtitle, children,
}: { title: string; subtitle?: string; children?: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader title={title} subtitle={subtitle} />
        <main className="flex-1 p-6 lg:p-8">
          {children ?? <Outlet />}
        </main>
      </div>
    </div>
  );
}
