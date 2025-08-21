"use client";

import { useState } from "react";

const BillsHeader = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  return (
    <header className="bills-header flex flex-col">
      <h2>Bills</h2>
      <div className="month-selector flex items-center justify-between px-4">
        <button
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
            )
          }
        >
          Previous
        </button>
        <span>
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <button
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
            )
          }
        >
          Next
        </button>
      </div>
    </header>
  );
};

export default BillsHeader;
