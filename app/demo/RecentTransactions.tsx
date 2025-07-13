const RecentTransactions = () => {
  return (
    <div className="recent-transactions w-full bg-white rounded-lg shadow mb-4 pb-4">
      <div className="recent-transactions_header p-4 flex justify-between items-center border-b border-gray-300 shadow-sm">
        <div className="header-content flex flex-col">
          <h2 className="font-bold text-lg">Recent Transactions</h2>
          <p className="text-sm text-gray-500">
            Here are your most recent transactions.
          </p>
        </div>
        <p>View all transactions</p>
      </div>
      <ul className="transactions-list_header flex justify-between p-4 rounded-t-lg border-b border-gray-300">
        <li className="font-bold flex-1 text-center">Date</li>
        <li className="font-bold flex-1 text-center">Name</li>
        <li className="font-bold flex-1 text-center">Amount</li>
        <li className="font-bold flex-1 text-center">Type</li>
        <li className="font-bold flex-1 text-center">Budget</li>
      </ul>
      <ul className="transactions-list_body flex flex-col w-full bg-white rounded-lg shadow">
        {/* Example static data for demonstration */}
        <li className="flex justify-between items-center py-2 border-b">
          <span className="flex-1 text-center text-sm">2023-10-01</span>
          <span className="flex-1 text-center text-sm">Grocery Shopping</span>
          <span className="flex-1 text-center text-sm text-red-500">
            -$50.00
          </span>
          <span className="flex-1 text-center text-sm">Expense</span>
          <span className="flex-1 text-center text-sm">Monthly Budget</span>
        </li>
        <li className="flex justify-between items-center py-2 border-b">
          <span className="flex-1 text-center text-sm">2023-10-01</span>
          <span className="flex-1 text-center text-sm">Salary</span>
          <span className="flex-1 text-center text-sm text-green-500">
            +$2000.00
          </span>
          <span className="flex-1 text-center text-sm">Income</span>
          <span className="flex-1 text-center text-sm">Monthly Budget</span>
        </li>
      </ul>
    </div>
  );
};

export default RecentTransactions;
