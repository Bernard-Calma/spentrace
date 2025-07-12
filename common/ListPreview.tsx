"use client";
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
        <h2 className="text-lg">Recent Transactions</h2>
        {listItems.length ? (
          <p className="text-sm text-gray-500">View All</p>
        ) : (
          <Link
            href={`${pathname}/add-transaction`}
            className="text-sm text-gray-500"
          >
            Add a transaction
          </Link>
        )}
      </div>
      <ul>
        {listItems.slice(0, length).map((item) => (
          <li key={item.id}>
            {item.name} - {item.amount} ({item.type}) on {item.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListPreview;
