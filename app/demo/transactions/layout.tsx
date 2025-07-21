"use client";

import { TransactionHeader } from "./components";
import { useState } from "react";
import Transactions from "./page";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showAddTransaction, setShowAddTransaction] = useState(false);

  const handleSetShowAddTransaction = () => {
    setShowAddTransaction(!showAddTransaction);
    // console.log("Show Add Transaction:", !showAddTransaction);
  };
  return (
    <div className="transactions-page w-full h-full flex flex-col flex-1 justify-start">
      <TransactionHeader showAddTransaction={handleSetShowAddTransaction} />
      <Transactions
        showAddTransaction={showAddTransaction}
        closeAddTransaction={handleSetShowAddTransaction}
      />
    </div>
  );
}
