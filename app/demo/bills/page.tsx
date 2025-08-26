"use client";

import { useState } from "react";
import { AddBill, BillsHeader, BillsList } from "./components";
import "./styles.scss";

const Bills = () => {
  const [showAdd, setShowAdd] = useState(false);

  const handleToggleAdd = (): void => {
    setShowAdd(!showAdd);
  };

  return (
    <div className="bills-page max-w-512 mx-auto h-full flex flex-col flex-1 justify-start">
      <BillsHeader handleToggleAdd={handleToggleAdd} />
      {showAdd && <AddBill handleToggleAdd={handleToggleAdd} />}
      <div className="bills-body self-center w-256 h-full bg-white rounded-lg shadow-md">
        <div className="p-2 flex justify-between font-bold text-sm rounded-tl border-black bg-gray-300">
          <p className="flex-1 text-center">Due Date</p>
          <p className="flex-1 text-center">Name</p>
          <p className="flex-1 text-center">Amount</p>
          <p className="flex-1 text-center">Status</p>
        </div>
        <BillsList />
      </div>
    </div>
  );
};

export default Bills;
