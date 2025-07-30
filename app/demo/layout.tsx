"use client";

import { MobileNavigation, Navigation } from "@/common";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="demo-page w-full md:flex justify-start">
      <Navigation />
      {children}
      <MobileNavigation />
    </div>
  );
}
