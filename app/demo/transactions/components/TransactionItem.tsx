import { deleteTransaction, editTransaction } from "@/store/features/demoSlice";
import { RootState } from "@/store/store";
import { format, parseISO } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type newStatus = "pending" | "sent" | "paid" | "cancelled";

const TransactionItem = ({
  transactionProp,
  handleToggleTransaction,
}: {
  transactionProp: Transaction;
  handleToggleTransaction: (transaction: Transaction) => void;
}) => {
  const dispatch = useDispatch();
  const { id } = useSelector((state: RootState) => state.user);
  const { collaborators } = useSelector((state: RootState) => state.demo);
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
    let newStatus: newStatus = e.target.value as newStatus;
    dispatch(editTransaction({ ...transaction, status: newStatus }));
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

  // If transactionProp changes, update the local state
  useEffect(() => {
    setTransaction(transactionProp);
  }, [transactionProp]);

  if (transactionProp)
    return (
      <div
        key={transaction.id}
        className="transaction-item px-2 flex items-center justify-between border-b border-gray-200 text-sm hover:bg-gray-50"
      >
        <div className="transaction-date flex-1 flex">
          <span
            ref={menuRef}
            onClick={handleShowMenu}
            className="transaction-menu relative pr-2 cursor-pointer hidden sm:block"
          >
            {showMenu && (
              <div className="transaction-menu-options absolute flex flex-col text-xs bg-gray-100 border border-gray-300 shadow-md z-1">
                <span
                  className="hover:bg-gray-200 p-2 hover:font-bold"
                  onClick={() => {
                    handleToggleTransaction(transaction);
                  }}
                >
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
          <p className="transaction-date flex-1">
            {format(parseISO(transaction.date), "MMMM do")}
          </p>
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

        <p
          className={`transaction-running-total flex-1 hidden sm:block ${
            (transaction.runningTotal ?? 0) > 0 ? "income" : "expense"
          }`}
        >
          $
          {transaction.runningTotal !== undefined
            ? transaction.runningTotal > 0
              ? transaction.runningTotal.toFixed(2)
              : Math.abs(transaction.runningTotal).toFixed(2)
            : "Unknown"}
        </p>

        <p className="transaction-added-by flex-1 hidden sm:block">
          {transaction.addedBy === id
            ? "You"
            : transaction.addedBy || "Unknown"}
        </p>
        <p
          className={`transaction-pay-to flex-1 ${
            transaction.type === "income" ? "italic" : ""
          } hidden sm:block`}
        >
          {transaction.type === "income" ? "Income" : transaction.payTo}
        </p>
        {transaction.type === "income" ? (
          <p className="transaction-assigned-to flex-1 italic">You</p>
        ) : (
          <select
            name="assignedTo"
            value={transaction.assignedTo}
            className="transaction-assigned-to flex-1 hidden sm:block"
            onChange={handleChangeStatus}
          >
            <option value={id}>You</option>
            {/* Map through collaborators to show options */}
            {collaborators.map((user: string) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        )}

        <select
          name="status"
          value={transaction.status}
          className="transaction-status flex-1"
          onChange={handleChangeStatus}
        >
          {transaction.type === "expense" ? (
            <>
              <option value="pending">Pending</option>
              <option value="sent">Sent</option>
              <option value="paid">Paid</option>
              <option value="cancelled">Cancelled</option>
            </>
          ) : (
            <>
              <option value="pending">Pending</option>
              <option value="sent">Paid</option>
            </>
          )}
        </select>
      </div>
    );
};

export default TransactionItem;
