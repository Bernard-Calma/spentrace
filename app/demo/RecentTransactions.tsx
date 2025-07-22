import Link from "next/link";
import { useRouter } from "next/navigation";

const RecentTransactions = ({
  transactions,
  budgetName,
}: {
  transactions: Transaction[];
  budgetName: string;
}) => {
  return (
    <div className="recent-transactions w-full bg-white rounded-lg shadow pb-4">
      <div className="recent-transactions_header p-2 flex justify-between items-center border-b border-gray-300 bg-gray-700">
        <div className="header-content flex flex-col text-white">
          <h2 className="font-bold text-lg">Recent Transactions</h2>
          <p className="text-sm text-gray-200">
            Here are your most recent transactions.
          </p>
        </div>
        <Link className="text-white" href="/demo/transactions">
          View all transactions
        </Link>
      </div>
      <ul className="transactions-list_header flex justify-between py-2 rounded-t-lg border-b border-gray-300 ">
        <li className="font-bold flex-1 text-center">Date</li>
        <li className="font-bold flex-1 text-center">Name</li>
        <li className="font-bold flex-1 text-center">Amount</li>
        <li className="font-bold flex-1 text-center">Type</li>
        <li className="font-bold flex-1 text-center">Budget</li>
      </ul>
      <ul className="transactions-list_body flex flex-col w-full bg-white rounded-lg shadow">
        {/* Example static data for demonstration */}
        {transactions.length === 0 ? (
          <li className="text-center text-gray-500 py-4">
            No recent transactions found.
          </li>
        ) : (
          transactions.map((transaction) => (
            <li
              key={transaction.id}
              className="flex justify-between items-center border-b text-sm last:border-0"
            >
              <span className="flex-1 text-center">
                {new Date(transaction.date).toLocaleDateString()}
              </span>
              <span className="flex-1 text-center">{transaction.name}</span>
              <span
                className={`flex-1 text-center ${
                  transaction.type === "expense"
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {transaction.type === "expense" ? "-" : "+"}$
                {transaction.amount.toFixed(2)}
              </span>
              <span className="flex-1 text-center">
                {transaction.type.charAt(0).toUpperCase() +
                  transaction.type.slice(1)}
              </span>
              <span className="flex-1 text-center">{budgetName}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default RecentTransactions;
