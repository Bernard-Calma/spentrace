import Link from "next/link";

const MobileNavigation = () => {
  return (
    <nav className="mobile-navigation">
      <ul className="mobile-nav-links w-full flex justify-around">
        <li>
          <Link href="/demo">📊</Link>
        </li>
        <li>
          <Link href="/demo/transactions">🧾</Link>
        </li>
        <li>
          <Link href="/demo">💰</Link>
        </li>
      </ul>
    </nav>
  );
};
export default MobileNavigation;
