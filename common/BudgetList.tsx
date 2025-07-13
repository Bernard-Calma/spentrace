const BudgetList = () => {
  return (
    <div className="budget-list text-sm flex w-full flex-col shadow-md rounded-lg">
      <div className="budget-list_header p-2 flex justify-between items-center border-b border-gray-300 bg-gray-700">
        <h2 className="text-lg font-bold text-white">Budget Lists</h2>
        <div className="budget-list_actions flex space-x-2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Budget
          </button>
          <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded">
            Export
          </button>
        </div>
      </div>
      <div className="budget-list_body flex flex-col w-full bg-white rounded-lg shadow">
        <ul className="list-header flex justify-between py-3 rounded-t-lg border-b border-gray-300">
          <li className="font-bold flex-1 text-center">Budget Name</li>
          <li className="font-bold flex-1 text-center">Owner</li>
          <li className="font-bold flex-1 text-center">Collaborators</li>
          <li className="font-bold flex-1 text-center">Total Income</li>
          <li className="font-bold flex-1 text-center">Total Expenses</li>
          <li className="font-bold flex-1 text-center">No. of Transactions</li>
        </ul>
        <ul className="list-none w-full ">
          {/* This is where the budget items will be mapped */}
          {/* Example static data for demonstration */}
          <li className="flex justify-between items-center py-2 border-b">
            <span className="flex-1 text-center">Monthly Budget</span>
            <span className="flex-1 text-center">John Doe</span>
            <span className="flex-1 text-center">Jane Smith, Bob Johnson</span>
            <span className="flex-1 text-center">$5000.00</span>
            <span className="flex-1 text-center">$2000.00</span>
            <span className="flex-1 text-center">10</span>
          </li>
          {/* Add more budget items as needed */}
        </ul>
      </div>
    </div>
  );
};

export default BudgetList;
