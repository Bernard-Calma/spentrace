"use client";

import { LabelInput } from "@/common";
import { useState } from "react";
import { useSelector } from "react-redux";

const AddTransaction = ({ hideComponent }: { hideComponent: () => void }) => {
  const { isDemo } = useSelector((state: any) => state.user);
  const [newTransaction, setNewTransaction] = useState({
    id: crypto.randomUUID(),
    name: "",
    amount: "",
    date: "",
    type: "expense",
    category: "",
    notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Handle radio button change for type
    if (name === "type") {
      setNewTransaction((prev) => ({
        ...prev,
        type: value as "income" | "expense",
      }));
      return;
    }
    // Amount should be lower than 100,000
    if (name === "amount" && parseFloat(value) > 100000) {
      // prevent from adding + and - signs
      if (value.includes("+") || value.includes("-")) {
        setNewTransaction((prev) => ({
          ...prev,
          amount: "",
        }));
        return;
      }
      const formattedValue = parseFloat(value).toFixed(2);
      setNewTransaction({
        ...newTransaction,
        amount: Math.min(parseFloat(formattedValue), 100000).toFixed(2),
      });
      return;
    }

    setNewTransaction((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTransaction((prev) => ({
      ...prev,
      notes: e.target.value,
    }));
  };

  const handleAddTransaction = () => {
    // Logic to add transaction
    console.log("Adding transaction:", newTransaction);
  };

  return (
    <div className="overlay flex items-center justify-center fixed inset-0 bg-black opacity-80 z-50">
      <div className="add-transaction-modal w-96 relative bg-white p-4 rounded-lg shadow-lg">
        <button
          onClick={hideComponent}
          className="close-button absolute top-0 right-2 text-red-500 hover:text-red-800 transition-colors text-5xl cursor-pointer font-bold"
        >
          &times;
        </button>
        <h2 className="text-lg font-semibold">Add Transaction</h2>
        <LabelInput
          type="number"
          htmlFor="transactionAmount"
          text="Amount"
          pattern="[0-9]*"
          name="amount"
          placeholder="0"
          value={newTransaction.amount}
          onChange={handleChange}
        />
        <div className="input-radio flex justify-center  gap-4 m-4">
          <label>
            <input
              type="radio"
              name="type"
              value="expense"
              checked={newTransaction.type === "expense"}
              onChange={handleChange}
            />
            Expense
          </label>
          <label>
            <input
              type="radio"
              name="type"
              value="income"
              checked={newTransaction.type === "income"}
              onChange={handleChange}
            />
            Income
          </label>
        </div>
        <LabelInput
          type="text"
          htmlFor="transactionName"
          text="Transaction Name"
          name="name"
          placeholder="Enter transaction name"
          value={newTransaction.name}
          onChange={handleChange}
        />

        <LabelInput
          type="date"
          htmlFor="transactionDate"
          text="Date"
          name="date"
          placeholder="Select date"
          value={newTransaction.date}
          onChange={handleChange}
        />

        <LabelInput
          type="text"
          htmlFor="transactionCategory"
          text="Category"
          name="category"
          placeholder="Enter category"
          value={newTransaction.category}
          onChange={handleChange}
          disabled={!isDemo} // Disable if not in demo mode
        />

        <label className="font-semibold">Notes (optional)</label>
        <textarea
          className={`border border-gray-300 rounded p-2 w-full ${
            !isDemo
              ? "disabled:bg-gray-600 disabled:cursor-not-allowed disabled:text-gray-400 disabled:italic"
              : ""
          }`}
          name="notes"
          placeholder="Add notes (optional)"
          value={newTransaction.notes}
          onChange={handleNotesChange}
          rows={3}
          disabled={!isDemo} // Disable if not in demo mode
          title="If disabled, login or subscribe to enable feature."
        ></textarea>

        <div className="flex justify-end mt-4 gap-2">
          <button
            onClick={handleAddTransaction}
            className="btn btn-primary bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition-colors"
          >
            Add Transaction
          </button>
          <button
            onClick={hideComponent}
            className="btn btn-secondary mr-2 bg-gray-300 text-gray-800 rounded p-2 hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTransaction;
