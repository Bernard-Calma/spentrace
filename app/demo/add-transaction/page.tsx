"use client";

import { LabelInput } from "@/common";
import { format, parseISO } from "date-fns";
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
    // Format Date
    if (name === "date") {
      const dateValue = new Date(value);
      setNewTransaction((prev) => ({
        ...prev,
        date: parseISO(value),
      }));
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
    const transactionId = crypto.randomUUID(); // Generate a unique ID for the transaction
    const budget = JSON.parse(localStorage.getItem("budget") || "{}");
    const updatedTransactions = [
      ...(budget.transactions || []),
      { ...newTransaction, id: transactionId },
    ];
    localStorage.setItem(
      "budget",
      JSON.stringify({ ...budget, transactions: updatedTransactions })
    );
    // Redirect or show success message
    window.location.href = "/demo";
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
          <LabelInput
            type="date"
            htmlFor="date"
            text="Transaction Date:"
            name="date"
            value={format(newTransaction.date, "yyyy-MM-dd")} // Format date for input
            onChange={(e) =>
              handleChange(e as React.ChangeEvent<HTMLInputElement>)
            }
            placeholder="Select date"
            required
          />
          {/* Radio to set if tranasction is expense or income */}
          <div className="radio-group transaction-type flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="type"
                value="expense"
                checked={newTransaction.type === "expense"}
                onChange={() =>
                  setNewTransaction((prev) => ({
                    ...prev,
                    type: "expense",
                  }))
                }
              />
              Expense
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="type"
                value="income"
                checked={newTransaction.type === "income"}
                onChange={() =>
                  setNewTransaction((prev) => ({
                    ...prev,
                    type: "income",
                  }))
                }
              />
              Income
            </label>
          </div>
          <button
            type="submit"
            className="btn-primary mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
          >
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionPage;
