"use client";

import { editBill } from "@/store/features/demoSlice";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import { useDispatch } from "react-redux";

const BillsList = ({ bills }: { bills: Bill[] }) => {
  const dispatch = useDispatch();

  const handleTogglePaid = (bill: Bill) => {
    dispatch(editBill({ ...bill, paid: !bill.paid }));
  };
  if (bills.length === 0) {
    return <p>No bills found.</p>;
  }
  return (
    <div className="bills-list">
      <ul>
        {bills.map((bill: Bill) => (
          <Link key={bill.id} href={`bills/${bill.id}`}>
            <div className="px-2 flex items-center justify-between border-b border-gray-200 text-sm cursor-pointer hover:bg-blue-300">
              <p className="flex-1 text-center">
                {format(parseISO(bill.dueDate), "MMM dd")}
              </p>
              <p className="flex-1 text-center">{bill.name}</p>
              <p className="flex-1 text-center">${bill.amount}</p>
              <p className="flex-1 text-center">{bill.repeat || "One-time"}</p>
              <div className="flex-1 flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={bill.paid}
                  onClick={(e) => e.stopPropagation()}
                  onChange={() => handleTogglePaid(bill)}
                />
              </div>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default BillsList;
