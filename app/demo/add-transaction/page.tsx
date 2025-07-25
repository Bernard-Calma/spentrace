"use client";

import { LabelInput } from "@/common";
import { addTransaction } from "@/store/features/demoSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddTransaction = ({ hideComponent }: { hideComponent: () => void }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { id, isDemo }: { id: string; isDemo: boolean } = useSelector(
    (state: any) => state.user
  );
  const { collaborators } = useSelector((state: any) => state.demo);
  const [newTransaction, setNewTransaction] = useState({
    id: crypto.randomUUID(),
    name: "",
    amount: 0,
    date: "",
    type: "expense",
    category: "",
    notes: "",
    addedBy: id, // Automatically set to the current user's ID
    status: "pending", // Default status can be set to 'pending'
    assignedTo: id, // Default assigned to current user
  } as Transaction);

  //   console.log("isDemo:", isDemo);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Handle radio button change for type
    if (name === "type") {
      setNewTransaction({
        ...newTransaction,
        type: value as "income" | "expense",
      });
      return;
    }
    // Amount should be lower than 100,000
    if (name === "amount" && parseFloat(value) > 100000) {
      const formattedValue = parseFloat(value).toFixed(2);
      setNewTransaction({
        ...newTransaction,
        amount: Math.min(parseFloat(formattedValue), 100000),
      });
      return;
    }

    // Restrict number input to 6 decimal places
    if (name === "amount" && value.includes(".")) {
      const decimalPlaces = value.split(".")[1].length;
      if (decimalPlaces > 4) {
        e.preventDefault();
        return;
      }
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

  const handleAddTransaction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Logic to add transaction
    // Convert amount to number if it's a string
    if (typeof newTransaction.amount === "string") {
      newTransaction.amount = parseFloat(newTransaction.amount);
    }
    // console.log("Adding transaction:", newTransaction);

    dispatch(addTransaction(newTransaction));
    router.back();
  };

  return (
    <div className="overlay flex items-center justify-center">
      <form
        onSubmit={handleAddTransaction}
        className="add-transaction-form w-96 relative bg-white p-4 rounded-lg shadow-lg"
      >
        <button
          onClick={() => router.back()}
          className="close-button absolute top-0 right-2 text-red-500 hover:text-red-800 transition-colors text-5xl cursor-pointer font-bold"
        >
          &times;
        </button>
        <h2 className="text-lg font-semibold">Add Transaction</h2>
        <div className="input-amount flex items-center justify-center">
          {" "}
          <span className="text-5xl font-bold ">$</span>
          <input
            className="field-sizing-content px-2 rounded text-5xl font-bold focus:outline-none appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            type="number"
            placeholder="0"
            name="amount"
            pattern="[0-9]*"
            // no negative
            min="0"
            value={newTransaction.amount === 0 ? "" : newTransaction.amount}
            onKeyDown={(e) => {
              // prevent plus or minus signs
              if (e.key === "+" || e.key === "-") {
                e.preventDefault();
              }
            }}
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>

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

        <div className="input-select flex flex-col">
          <label className="font-semibold">Assigned To</label>
          <select
            name="assignedTo"
            className={`p-2 border rounded ${
              isDemo
                ? "disabled:bg-gray-600 disabled:cursor-not-allowed disabled:text-gray-400 disabled:italic font-semibold"
                : ""
            }`}
            disabled={isDemo} // Disable if not in demo mode
            required
          >
            <option value={id}>You</option>
            {collaborators.map((user: string) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>

        <LabelInput
          type="text"
          htmlFor="transactionName"
          text="Transaction Name"
          name="name"
          placeholder="Enter transaction name"
          value={newTransaction.name}
          onChange={handleChange}
          required={true}
        />

        <LabelInput
          type="date"
          htmlFor="transactionDate"
          text="Date"
          name="date"
          placeholder="Select date"
          value={newTransaction.date}
          onChange={handleChange}
          required={true}
        />

        <LabelInput
          type="text"
          htmlFor="payTo"
          text="Pay To"
          name="payTo"
          placeholder="Enter recipient"
          value={newTransaction.payTo}
          onChange={handleChange}
        />

        <LabelInput
          disabled={isDemo} // Disable if not in demo mode
          type="text"
          htmlFor="transactionCategory"
          text="Category"
          name="category"
          placeholder="Enter category"
          value={newTransaction.category}
          onChange={handleChange}
        />

        <label className="font-semibold">Notes (optional)</label>
        <textarea
          className={`border border-gray-300 rounded p-2 w-full ${
            isDemo
              ? "disabled:bg-gray-600 disabled:cursor-not-allowed disabled:text-gray-400 disabled:italic"
              : ""
          }`}
          name="notes"
          placeholder="Add notes (optional)"
          value={newTransaction.notes}
          onChange={handleNotesChange}
          rows={3}
          disabled={isDemo} // Disable if not in demo mode
          //   title="If disabled, login or subscribe to enable feature."
        ></textarea>

        <div className="flex justify-end mt-4 gap-2">
          <button
            type="submit"
            className="btn btn-primary bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition-colors"
          >
            Add Transaction
          </button>
          <button
            onClick={() => router.back()}
            className="btn btn-secondary mr-2 bg-gray-300 text-gray-800 rounded p-2 hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTransaction;
