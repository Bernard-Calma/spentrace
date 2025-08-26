"use client";

import { useSelector } from "react-redux";

const BillsList = () => {
  const { bills } = useSelector((state: any) => state.demo);
  return (
    <div>
      <ul>
        {bills.map((bill: Bill) => (
          <li key={bill.id}>
            <div className="px-2 flex items-center justify-between border-b border-gray-200 text-sm hover:bg-gray-50">
              <p className="flex-1 text-center">{bill.dueDate}</p>
              <p className="flex-1 text-center">{bill.name}</p>
              <p className="flex-1 text-center">${bill.amount}</p>
              <div className="flex-1 flex justify-center align-center gap-2 text-center">
                <p>{bill.paid}</p>
                <input type="checkbox" checked={bill.paid} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BillsList;
