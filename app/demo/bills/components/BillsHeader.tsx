"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const BillsHeader = ({
  handleToggleAdd,
  handleFilterBills,
  filter,
  setFilter,
}: {
  handleToggleAdd: () => void;
  handleFilterBills: (filter: string) => void;
  filter: string;
  setFilter: (filter: string) => void;
}) => {
  const { bills } = useSelector((state: any) => state.demo);
  const [totalPaid, setTotalPaid] = useState<number>(0);
  const [totalUnpaid, setTotalUnpaid] = useState<number>(0);

  useEffect(() => {
    const paid = bills
      .filter((bill: Bill) => bill.paid)
      .reduce((sum: number, bill: Bill) => sum + bill.amount, 0);
    const unpaid = bills
      .filter((bill: Bill) => !bill.paid)
      .reduce((sum: number, bill: Bill) => sum + bill.amount, 0);
    setTotalPaid(parseFloat(paid));
    setTotalUnpaid(parseFloat(unpaid));
  }, [bills]);

  return (
    <header className="bills-header flex flex-col">
      <div className="p-4 flex items-center justify-between ">
        <h2 className="text-md font-semibold">Bills</h2>
        <div className="flex gap-4">
          <p>
            Total Paid: <span className="income">${totalPaid.toFixed(2)}</span>
          </p>
          <p>
            Total Unpaid:{" "}
            <span className="expense">${totalUnpaid.toFixed(2)}</span>
          </p>
        </div>
        <div className="flex justify-between gap-4">
          <p
            className={`cursor-pointer ${filter === "paid" ? "font-bold" : ""}`}
            onClick={() => {
              handleFilterBills("paid");
              setFilter("paid");
            }}
          >
            Paid
          </p>
          <p
            className={`cursor-pointer ${
              filter === "unpaid" ? "font-bold" : ""
            }`}
            onClick={() => {
              handleFilterBills("unpaid");
              setFilter("unpaid");
            }}
          >
            Unpaid
          </p>
          <p
            className={`cursor-pointer ${filter === "all" ? "font-bold" : ""}`}
            onClick={() => {
              handleFilterBills("all");
              setFilter("all");
            }}
          >
            Show All
          </p>
          <button
            className="btn btn-primary px-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded shadow transition-colors cursor-pointer"
            onClick={handleToggleAdd}
          >
            + Add Bill
          </button>
        </div>
      </div>
      {/* <div className="month-selector flex items-center justify-between px-4 bg-gray-200">
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
      </div> */}
    </header>
  );
};

export default BillsHeader;
