"use client";

import { LabelInput } from "@/common";
import { useState } from "react";

interface Transaction {
  id: string;
  name: string;
  amount: number;
  date: Date;
  type: "income" | "expense";
}

const AddTransactionPage = () => {
  const [newTransaction, setNewTransaction] = useState<Transaction>({
    id: "",
    name: "",
    amount: 0,
    date: new Date(),
    type: "income",
  });

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Format amount
    if (name === "amount") {
      // remove leading zero
      let formattedValue: string = await value.replace(/^0+/, "");
      // change to number
      let numericValue = parseFloat(formattedValue);
      setNewTransaction({
        ...newTransaction,
        amount: Math.min(numericValue, 999999.99), // Limit to 6 digits
      });
      return;
    }
    setNewTransaction((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    // Validate form
    if (!form.checkValidity()) {
      form.reportValidity(); // This triggers native browser validation messages
      return;
    }
    // Add transaction logic here
    console.log("New Transaction Added:", newTransaction);
    // Redirect or show success message
    // window.location.href = "/demo";
  };
  return (
    <div className="overlay w-full flex flex-col items-center justify-center p-12 bg-gray-900">
      <div className="relative add-transaction-page w-full max-w-md bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold">Add Transaction</h1>
        <button
          className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-4xl"
          onClick={() => window.history.back()}
        >
          &times;
        </button>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <LabelInput
            type="text"
            htmlFor="name"
            text="Transaction Name:"
            name="name"
            placeholder="Enter transaction name"
            value={newTransaction.name}
            onChange={handleChange}
            required
          />
          <LabelInput
            type="number"
            htmlFor="amount"
            text="Transaction Amount:"
            name="amount"
            value={newTransaction.amount}
            onChange={handleChange}
            placeholder="0"
            required
          />
          <button type="submit">Add Transaction</button>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionPage;
