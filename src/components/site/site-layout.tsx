import type { ReactNode } from "react";
import { SiteHeader } from "./header";
import { SiteFooter } from "./footer";
import { MobileBottomNav } from "./mobile-nav";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 pb-20 lg:pb-0">{children}</main>
      <SiteFooter />
      <MobileBottomNav />
    </div>
  );
}
