// Component to display pending transactions that will be change to sent
const PendingTransactions = ({ transactions }: { transactions: any[] }) => {
  return (
    <div className="pending-transactions my-4 p-4 border border-yellow-300 rounded bg-yellow-50">
      <h2 className="text-lg font-bold mb-2">Pending Transactions</h2>
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
        {transactions.length === 0 ? (
          <>
            <p className="font-bold">No pending transactions</p>
            <p className="text-sm">
              You have no pending transactions at the moment.
            </p>
          </>
        ) : (
          <ul className="list-none">
            {transactions.map((tx, index) => (
              <li key={index} className="py-2 border-b border-yellow-300">
                <p className="font-bold">{tx.name}</p>
                <p className="text-sm">Amount: ${tx.amount}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PendingTransactions;
