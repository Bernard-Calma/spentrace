const TransactionHeader = () => {
  return (
    <div className="transaction-header flex items-center justify-between p-4 bg-gray-100">
      <h2 className="text-md font-semibold">Transactions</h2>
      <button className="btn btn-primary">Add Transaction</button>
    </div>
  );
};

export default TransactionHeader;
