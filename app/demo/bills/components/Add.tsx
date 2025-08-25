"use client";

import { useState } from "react";

const AddBill: React.FC<{ handleToggleAdd: () => void }> = ({
  handleToggleAdd,
}) => {
  const [newBill, setNewBill] = useState({
    dueDate: Date.now(),
    name: "",
    amount: 0,
    paid: false,
  });

  const handleChange = (e: any) => {
    setNewBill({
      ...newBill,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitAddBill = (e: any) => {
    e.preventDefault();
    console.log(newBill);
  };
  return (
    <div className="overlay flex items-center justify-center">
      <div className="modal-content bg-white p-4 rounded shadow-lg">
        <h2 className="text-2xl font-bold text-center">Add Bill</h2>
        <form onSubmit={handleSubmitAddBill} className="p-4">
          <label htmlFor="dueDate" className="text-md font-semibold">
            Due Date
          </label>
          <input
            type="date"
            name="dueDate"
            className="w-full border px-2 mb-2 rounded"
            onChange={handleChange}
          />
          <label htmlFor="name" className="text-md font-semibold">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="w-full border px-2 mb-2 rounded"
            onChange={handleChange}
          />
          <label htmlFor="amount" className="text-md font-semibold">
            Amount
          </label>
          <input
            type="number"
            name="amount"
            className="w-full border px-2 mb-2 rounded"
            onChange={handleChange}
          />
          <div className="flex justify-center gap-2">
            {" "}
            <button
              onClick={handleToggleAdd}
              className="bg-red-500 hover:bg-red-400 text-white font-bold py-1 px-2 border-b-4 border-red-700 hover:border-red-500 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-2 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBill;
