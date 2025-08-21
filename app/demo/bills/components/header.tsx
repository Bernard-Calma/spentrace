"use client";

import { useState } from "react";

const BillsHeader = () => {
  const today = new Date();
  const [filter, setFilter] = useState("all");
  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  return (
    <header className="bills-header flex flex-col">
      <div className="flex items-center justify-between">
        <h2>Bills</h2>
        <div className="flex justify-between gap-4">
          <p
            className={`cursor-pointer ${filter === "paid" ? "font-bold" : ""}`}
            onClick={() => setFilter("paid")}
          >
            Paid
          </p>
          <p
            className={`cursor-pointer ${
              filter === "unpaid" ? "font-bold" : ""
            }`}
            onClick={() => setFilter("unpaid")}
          >
            Unpaid
          </p>
          <p
            className={`cursor-pointer ${filter === "all" ? "font-bold" : ""}`}
            onClick={() => setFilter("all")}
          >
            Show All
          </p>
        </div>
      </div>
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
