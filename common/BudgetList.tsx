import { useSelector } from "react-redux";

const BudgetList = () => {
  const { storeUser, isDemo } = useSelector((state: any) => state.user);
  const demo = useSelector((state: any) => state.demo);
  return (
    <div className="budget-list text-sm flex w-full flex-col shadow-md rounded-lg pb-4">
      <div className="budget-list_header p-2 flex justify-between items-center border-b border-gray-300 bg-gray-700">
        <h2 className="text-lg font-bold text-white">Budget Lists</h2>
        <div className="budget-list_actions flex space-x-2">
          <button
            className={`bg-blue-500 text-white px-4 py-2 rounded ${
              isDemo ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            Add Budget
          </button>
          <button
            className={`bg-gray-300 text-gray-700 px-4 py-2 rounded ${
              isDemo ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            Export
          </button>
        </div>
      </div>
      <div className="budget-list_body flex flex-col w-full bg-white rounded-lg shadow">
        <ul className="list-header flex justify-between py-2 rounded-t-lg border-b border-gray-300">
          <li className="font-bold flex-1 text-center">Budget Name</li>
          <li className="font-bold flex-1 text-center">Owner</li>
          <li className="font-bold flex-1 text-center">Collaborators</li>
          <li className="font-bold flex-1 text-center">Total Income</li>
          <li className="font-bold flex-1 text-center">Total Expenses</li>
          <li className="font-bold flex-1 text-center">No. of Transactions</li>
        </ul>
        {isDemo ? (
          <ul className="list-none w-full ">
            {/* This is where the budget items will be mapped */}
            {/* Example static data for demonstration */}
            <li className="flex justify-between items-center py-2 border-b">
              <span className="flex-1 text-center cursor-pointer">
                {demo.budgetName}
              </span>
              <span className="flex-1 text-center">{demo.owner}</span>
              <p
                className={`flex-1 text-center ${
                  demo.collaborators.length > 0
                    ? "cursor-pointer"
                    : "cursor-not-allowed text-gray-500"
                }`}
              >
                {demo.collaborators.length > 0
                  ? demo.collaborators.join(", ")
                  : "Add"}
              </p>
              <span className="flex-1 text-center income">
                ${demo.totalIncome}
              </span>
              <span className="flex-1 text-center expense">
                ${demo.totalExpenses}
              </span>
              <span className="flex-1 text-center">
                {demo.transactions.length}
              </span>
            </li>
            {/* Add more budget items as needed */}
          </ul>
        ) : (
          <div className="user-message p-4 text-center text-gray-600">
            Welcome, {storeUser.name}! Here are your budgets.
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetList;
