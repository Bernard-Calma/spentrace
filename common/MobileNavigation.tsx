import Link from "next/link";

const MobileNavigation = () => {
  return (
    <nav className="mobile-navigation">
      <ul className="mobile-nav-links w-full flex justify-around">
        <li>
          <Link href="/demo/transactions">Transactions</Link>
        </li>
        <li>
          <Link href="/demo/add-transaction">Add Transaction</Link>
        </li>
        <li>
          <Link href="/demo/budgets">Budgets</Link>
        </li>
      </ul>
    </nav>
  );
};
export default MobileNavigation;
