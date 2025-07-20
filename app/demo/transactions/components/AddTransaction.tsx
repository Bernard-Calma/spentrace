"use client";

import { useState } from "react";

const AddTransaction = ({ hideComponent }: { hideComponent: () => void }) => {
  const [transactionName, setTransactionName] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");

  const handleAddTransaction = () => {
    // Logic to add transaction
    console.log("Adding transaction:", transactionName, transactionAmount);
  };

  return (
    <div className="overlay  flex items-center justify-center fixed inset-0 bg-black opacity-80 z-50">
      <div className="add-transaction-modal relative bg-white p-4 rounded-lg shadow-lg">
        <button
          onClick={hideComponent}
          className="close-button absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>
        <h2 className="text-lg font-semibold">Add Transaction</h2>
        <input
          type="text"
          placeholder="Transaction Name"
          value={transactionName}
          onChange={(e) => setTransactionName(e.target.value)}
          className="input input-bordered w-full mb-2"
        />
        <input
          type="number"
          placeholder="Amount"
          value={transactionAmount}
          onChange={(e) => setTransactionAmount(e.target.value)}
          className="input input-bordered w-full mb-2"
        />
        <button onClick={handleAddTransaction} className="btn btn-primary">
          Add Transaction
        </button>
      </div>
    </div>
  );
};

export default AddTransaction;
