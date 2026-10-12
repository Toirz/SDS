import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { event } from "@/features/event/config";
import "./globals.css";

export const metadata: Metadata = {
  title: event.name,
  description: event.description,
  openGraph: { title: event.name, description: event.description, type: "website", locale: "en_SG" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
