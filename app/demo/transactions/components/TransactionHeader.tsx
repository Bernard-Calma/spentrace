import { useRouter } from "next/navigation";
import { useState } from "react";

const TransactionHeader = ({
  setFilter,
}: {
  setFilter: (filter: TransactionStatus) => void;
}) => {
  const router = useRouter();
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleFilterChange = (filter: TransactionStatus) => {
    setFilter(filter);
    setShowFilters(false);
  };
  return (
    <div className="transaction-header flex items-center justify-between p-4 bg-gray-100">
      <h2 className="text-md font-semibold">Transactions</h2>
      <div className="flex items-center space-x-4">
        <p
          className="menu-refresh cursor-pointer"
          title={"refresh"}
          onClick={() => handleFilterChange("all")}
        >
          🔄
        </p>
        <p
          className="menu-previous cursor-pointer"
          title={"previous"}
          onClick={() => {
            handleFilterChange("paid");
          }}
        >
          🕘
        </p>
        <div className="menu-filter relative cursor-pointer">
          <p title={"filter"} onClick={toggleFilters}>
            🔽
          </p>
          {showFilters && (
            <div className="absolute top-full left-0 bg-white shadow-md rounded mt-2 p-2 z-10">
              <ul>
                <li
                  className="cursor-pointer hover:bg-gray-200 p-1"
                  onClick={() => handleFilterChange("all")}
                >
                  All
                </li>
                <li
                  className="cursor-pointer hover:bg-gray-200 p-1"
                  onClick={() => handleFilterChange("paid")}
                >
                  Paid
                </li>
                <li
                  className="cursor-pointer hover:bg-gray-200 p-1"
                  onClick={() => handleFilterChange("pending")}
                >
                  Pending
                </li>
                <li
                  className="cursor-pointer hover:bg-gray-200 p-1"
                  onClick={() => handleFilterChange("cancelled")}
                >
                  Cancelled
                </li>
              </ul>
            </div>
          )}
        </div>

        <button
          className="btn btn-primary p-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded shadow transition-colors cursor-pointer"
          onClick={() => router.push("add-transaction")}
        >
          + Add Transaction
        </button>
      </div>
    </div>
  );
};

export default TransactionHeader;
