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
    <div className="bills-page w-full h-full flex flex-col flex-1 justify-start">
      <BillsHeader handleToggleAdd={handleToggleAdd} />
      {showAdd && <AddBill handleToggleAdd={handleToggleAdd} />}
      <div className="bills-body">
        <div className="flex justify-between bg-gray-300">
          <p>Due Date</p>
          <p>Name</p>
          <p>Amount</p>
        </div>
        <BillsList />
      </div>
    </div>
  );
};

export default Bills;
