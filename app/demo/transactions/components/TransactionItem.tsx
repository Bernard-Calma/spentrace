import { deleteTransaction } from "@/store/features/demoSlice";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type newStatus = "pending" | "completed" | "cancelled";

const TransactionItem = ({
  transactionProp,
}: {
  transactionProp: Transaction;
}) => {
  const dispatch = useDispatch();
  const { id } = useSelector((state: any) => state.user);
  const [transaction, setTransaction] = useState(transactionProp);
  let [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleShowMenu = () => {
    setShowMenu(true);
  };

  const handleDeleteTransaction = () => {
    // console.log("Deleting transaction:", transaction.id);
    // Dispatch delete action here
    dispatch(deleteTransaction(transaction.id));
    setShowMenu(false);
  };

  const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let newStatus: newStatus = "pending";
    // Update the transaction status
    if (e.target.value === "completed") {
      newStatus = "completed";
    } else if (e.target.value === "cancelled") {
      newStatus = "cancelled";
    }
    setTransaction({ ...transaction, status: newStatus });
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);
  if (transactionProp)
    return (
      <div
        key={transaction.id}
        className="transaction-item px-2 flex items-center justify-between border-b border-gray-200"
      >
        <div className="transaction-date flex-1 flex">
          <span
            ref={menuRef}
            onClick={handleShowMenu}
            className="transaction-menu relative pr-2 cursor-pointer"
          >
            {showMenu && (
              <div className="transaction-menu-options absolute flex flex-col text-xs bg-gray-100 border border-gray-300 shadow-md  z-1">
                <span className="hover:bg-gray-200 p-2 hover:font-bold">
                  Edit
                </span>
                <span
                  className="hover:bg-gray-200 p-1 hover:font-bold"
                  onClick={handleDeleteTransaction}
                >
                  Delete
                </span>
              </div>
            )}
            &#8942;
          </span>
          <p>{new Date(transaction.date).toLocaleDateString()}</p>
        </div>
        <p className="transaction-name flex-2">{transaction.name}</p>
        <p
          className={`transaction-amount flex-1 ${
            transaction.type === "expense" ? "expense" : "income"
          }`}
        >
          {/* Insert comma ',' per 1000 and decimals */}$
          {transaction.amount > 1000
            ? transaction.amount
                .toFixed(2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : transaction.amount.toFixed(2)}
        </p>
        <p className="transaction-added-by flex-1">
          {transaction.addedBy === id
            ? "You"
            : transaction.addedBy || "Unknown"}
        </p>
        <select
          name="status"
          value={transaction.status}
          className="transaction-status flex-1"
          onChange={handleChangeStatus}
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
    );
};

export default TransactionItem;
