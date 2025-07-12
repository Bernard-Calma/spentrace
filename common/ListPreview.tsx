"use client";
import { format } from "date-fns";
import Link from "next/link";

import { usePathname } from "next/navigation";

interface Transaction {
  id: string;
  name: string;
  amount: number;
  date: string;
  type: "income" | "expense";
}

interface ListPreviewProps {
  length?: number; // Optional prop to specify the length of the list
  listItems: Transaction[];
}

const ListPreview = ({ length = 5, listItems = [] }: ListPreviewProps) => {
  const pathname = usePathname();
  return (
    <div className="list-preview w-full max-w-md p-4 bg-white rounded shadow">
      <div className="list-preview-header flex items-center justify-between mb-4">
        <h3 className="text-md font-bold">Recent Transactions</h3>
        {listItems.length ? (
          <p className="text-sm  text-gray-500 hover:text-blue-500 transition-colors">
            View All
          </p>
        ) : (
          <Link
            href={`${pathname}/add-transaction`}
            className="text-sm text-gray-500 hover:text-blue-500 transition-colors"
          >
            Add a transaction
          </Link>
        )}
      </div>
      <ul>
        {listItems.map((t, idx) =>
          idx <= length - 1 ? (
            <li
              key={idx}
              className="transaction-item flex items-center justify-between p-2 border-b last:border-b-0"
            >
              <div className="transaction-item_details">
                <p className="transaction-item_name">{t.name}</p>
                <p className="transaction-item_date text-sm text-gray-500">
                  {format(t.date, "MMMM-dd")}
                </p>
              </div>
              <p
                className={`transaction-item_amount ${
                  t.amount < 0 ? "expense" : "income"
                }`}
              >
                {t.amount < 0 ? "-" : "+"}${Math.abs(t.amount).toFixed(2)}
              </p>
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
};

export default ListPreview;
