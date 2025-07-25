import { Navigation } from "@/common";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="demo-page w-full flex justify-start">
      <Navigation />
      {children}
    </div>
  );
}
