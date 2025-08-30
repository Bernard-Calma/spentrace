"use client";

import { useEffect, useState } from "react";
import { AddBill, BillsHeader, BillsList } from "./components";
import "./styles.scss";
import { useSelector } from "react-redux";

const Bills = () => {
  const { bills } = useSelector((state: any) => state.demo);

  const [showAdd, setShowAdd] = useState(false);
  const [showBill, setShowBill] = useState(false);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [billList, setBillList] = useState(bills);
  const [filter, setFilter] = useState("all");

  const handleToggleAdd = (): void => {
    setShowAdd(!showAdd);
  };

  const handleToggleBill = (bill: Bill): void => {
    setShowBill(!showBill);
    setSelectedBill(bill);
  };

  const handleFilterBills = (filter: string): void => {
    if (filter === "paid") {
      setBillList(bills.filter((bill: Bill) => bill.paid === true));
    } else if (filter === "unpaid") {
      setBillList(bills.filter((bill: Bill) => bill.paid === false));
    } else {
      setBillList(bills);
    }
  };

  useEffect(() => {
    setBillList(bills);
    handleFilterBills(filter);
  }, [bills]);

  return (
    <div className="bills-page max-w-512 mx-auto h-full flex flex-col flex-1 justify-start">
      <BillsHeader
        handleToggleAdd={handleToggleAdd}
        handleFilterBills={handleFilterBills}
        filter={filter}
        setFilter={setFilter}
      />
      {showAdd && <AddBill handleToggleAdd={handleToggleAdd} />}
      <div className="bills-body self-center w-256 h-full bg-white rounded-lg shadow-md">
        <div className="p-2 flex justify-between font-bold text-sm rounded-tl border-black bg-gray-300">
          <p className="flex-1 text-center">Due Date</p>
          <p className="flex-1 text-center">Name</p>
          <p className="flex-1 text-center">Amount</p>
          <p className="flex-1 text-center">Paid</p>
        </div>
        {bills?.length > 0 ? (
          <BillsList bills={billList} handleToggleBill={handleToggleBill} />
        ) : (
          <p className="text-center">No bills found.</p>
        )}
      </div>
    </div>
  );
};

export default Bills;
