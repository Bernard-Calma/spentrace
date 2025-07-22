"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const pathname = usePathname();
  const { id } = useSelector((state: any) => state.user.defaultBudget);
  // Nav links can be customized based on user state
  // Demo: Dashboard, Transactions, Profile, Help & Support
  // Registered: Dashboard, Transactions, Bills, Reports, Profile, Help & Support
  // Subscribed: Dashboard, Transactions, Bills, Reports, Analytics, Profile, Help & Support
  const navLinks = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: "🏠",
      demo: true,
      registered: true,
      subscribed: true,
    },
    {
      href: "/transactions",
      label: "Transactions",
      icon: "💳",
      demo: true,
      registered: true,
      subscribed: true,
    },
    // {
    //   href: "/bills",
    //   label: "Bills",
    //   icon: "💰",
    //   demo: false,
    //   registered: true,
    //   subscribed: true,
    // },
    // {
    //   href: "/reports",
    //   label: "Reports",
    //   icon: "📊",
    //   demo: false,
    //   registered: true,
    //   subscribed: true,
    // },
    // {
    //   href: "/analytics",
    //   label: "Analytics",
    //   icon: "📈",
    //   demo: false,
    //   registered: false,
    //   subscribed: true,
    // },
  ];

  const bottomNav = [
    // {
    //   href: "/help",
    //   label: "Help",
    //   icon: "❓",
    //   demo: true,
    //   registered: true,
    //   subscribed: true,
    // },
    // {
    //   href: "/support",
    //   label: "Support",
    //   icon: "🛠️",
    //   demo: true,
    //   registered: true,
    //   subscribed: true,
    // },
    {
      href: "/profile",
      label: "Demo User",
      icon: "👤",
      demo: true,
      registered: true,
      subscribed: true,
    },
  ];

  return (
    <nav className="navigation flex flex-col justify-between h-full w-48 ">
      <div className="top-nav flex">
        <Link href="/demo" className="text-lg font-bold pt-2 pl-4">
          SpenTrace
        </Link>
      </div>
      <ul className="nav-links flex flex-1 flex-col space-y-2 p-4">
        <Link
          href={"/demo"}
          className="text-gray-700 hover:text-blue-500 transition-colors"
        >
          🏠 Dashboard
        </Link>
        {id && (
          <Link
            href={`demo/transactions`}
            className="text-gray-700 hover:text-blue-500 transition-colors"
          >
            💳 Transactions
          </Link>
        )}
      </ul>
      {/* For User Menu, Help & Support */}
      <div className="bottom-nav flex flex-col p-2 space-y-2">
        {bottomNav.map(
          (link) =>
            (link.demo || link.registered || link.subscribed) && (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-500 transition-colors"
              >
                <span className="icon">{link.icon}</span>
                <span className="label">{link.label}</span>
              </Link>
            )
        )}
      </div>
    </nav>
  );
};
export default Navigation;
