import { Navigation } from "@/common";
import { TransactionHeader } from "./components";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="transactions-page w-full h-full flex flex-col flex-1 justify-start">
      <TransactionHeader />
      {children}
    </div>
  );
}
