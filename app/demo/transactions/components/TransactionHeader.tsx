import { useRouter } from "next/navigation";

const TransactionHeader = ({
  showAddTransaction,
}: {
  showAddTransaction: () => void;
}) => {
  const router = useRouter();
  return (
    <div className="transaction-header flex items-center justify-between p-4 bg-gray-100">
      <h2 className="text-md font-semibold">Transactions</h2>
      <div className="flex items-center space-x-4">
        <p className="menu-previous cursor-pointer">🕘</p>
        <p className="menu-filter cursor-pointer">🔽</p>
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
