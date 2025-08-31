"use client";

import { LabelInput } from "@/common";
import { addBill } from "@/store/features/demoSlice";
import { compareAsc, format } from "date-fns";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddBill: React.FC<{ handleToggleAdd: () => void }> = ({
  handleToggleAdd,
}) => {
  const dispatch = useDispatch();
  const { isDemo } = useSelector((state: any) => state.user);
  const { bills } = useSelector((state: any) => state.demo);

  const [newBill, setNewBill] = useState<Bill>({
    id: bills?.length + 1 + "",
    dueDate: format(new Date(), "yyyy-MM-dd"),
    repeat: undefined,
    endRepeat: null,
    name: "",
    amount: 0,
    category: "",
    paid: false,
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // Amount should be lower than 100,000
    if (name === "amount" && parseFloat(value) > 100000) {
      const formattedValue = parseFloat(value).toFixed(2);
      setNewBill({
        ...newBill,
        amount: Math.min(parseFloat(formattedValue), 100000),
      });
      return;
    }

    // Restrict number input to 6 decimal places
    if (name === "amount" && value.includes(".")) {
      const decimalPlaces = value?.split(".")[1].length;
      if (decimalPlaces > 4) {
        e.preventDefault();
        return;
      }
    }

    // Ensure endRepeat is after dueDate
    if (name === "endRepeat") {
      if (compareAsc(newBill.dueDate, e.target.value) === -1) {
        setNewBill({
          ...newBill,
          dueDate: e.target.value,
        });
      } else {
        setNewBill({
          ...newBill,
          endRepeat: newBill.dueDate,
        });
        return;
      }
    }

    if (name === "dueDate" && newBill.repeat && newBill.endRepeat) {
      if (compareAsc(newBill.endRepeat, e.target.value) === 1) {
        setNewBill({
          ...newBill,
          dueDate: e.target.value,
        });
      } else {
        setNewBill({
          ...newBill,
          dueDate: e.target.value,
          endRepeat: e.target.value,
        });
        return;
      }
    }

    setNewBill({
      ...newBill,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitAddBill = (e: any) => {
    e.preventDefault();
    if (newBill.repeat === "") {
      delete newBill.endRepeat;
    }
    dispatch(addBill(newBill));
    handleToggleAdd();
  };
  return (
    <div className="overlay flex items-center justify-center">
      <form
        onSubmit={handleSubmitAddBill}
        className="add-transaction-form w-96 relative bg-white p-4 rounded-lg shadow-lg"
      >
        <button
          onClick={handleToggleAdd}
          className="close-button absolute top-0 right-2 text-red-500 hover:text-red-800 transition-colors text-5xl cursor-pointer font-bold"
        >
          &times;
        </button>
        <h2 className="text-lg font-semibold">Add Bill</h2>
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
            step="0.01"
            value={newBill.amount === 0 ? "" : newBill.amount}
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

        <LabelInput
          type="text"
          htmlFor="name"
          text="Name"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required={true}
        />

        <LabelInput
          type="date"
          htmlFor="dueDate"
          text="Date"
          name="dueDate"
          placeholder="Select date"
          onChange={handleChange}
          required={true}
        />

        <div>
          <label htmlFor="repeat" className="text-md font-semibold">
            Repeat
          </label>
          <select
            name="repeat"
            id="repeat"
            className="bg-gray-100 border border-black rounded p-2 w-full"
            value={newBill.repeat}
            onChange={handleChange}
          >
            <option value="">No Repeat</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="bi-weekly">Bi-Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        {newBill.repeat && (
          <LabelInput
            type="date"
            htmlFor="endRepeat"
            text="End Repeat"
            name="endRepeat"
            placeholder="Select date"
            value={newBill.endRepeat || ""}
            onChange={handleChange}
            required={true}
          />
        )}

        <LabelInput
          disabled={isDemo} // Disable if not in demo mode
          type="text"
          htmlFor="transactionCategory"
          text="Category"
          name="category"
          placeholder="Enter category"
          value={newBill.category}
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
          value={newBill.notes}
          onChange={handleChange}
          rows={3}
          disabled={isDemo} // Disable if not in demo mode
          //   title="If disabled, login or subscribe to enable feature."
        ></textarea>

        <div className="flex justify-end mt-4 gap-2">
          <button
            type="submit"
            className="btn btn-primary bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition-colors"
          >
            Add Bill
          </button>
          <button
            onClick={handleToggleAdd}
            className="btn btn-secondary mr-2 bg-gray-300 text-gray-800 rounded p-2 hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBill;
