"use client";

import Link from "next/link";
import { useSelector } from "react-redux";

const Navigation = ({ user }: { user: any }) => {
  const { isDemo, defaultBudget } = useSelector((state: any) => state.user);
  const { id } = defaultBudget || {};

  // Nav links can be customized based on user state
  // Demo: Dashboard, Transactions, Profile, Help & Support
  // Registered: Dashboard, Transactions, Bills, Reports, Profile, Help & Support
  // Subscribed: Dashboard, Transactions, Bills, Reports, Analytics, Profile, Help & Support
  const navLinks = [
    {
      href: isDemo ? "/demo" : "/dashboard",
      label: "Dashboard",
      icon: "🏠",
      demo: true,
      registered: true,
      subscribed: true,
    },
    {
      href: isDemo ? "/demo/transactions" : "/transactions",
      label: "Transactions",
      icon: "💳",
      demo: true,
      registered: true,
      subscribed: true,
    },
    {
      href: isDemo ? "/demo/bills" : "/bills",
      label: "Bills",
      icon: "💰",
      demo: false,
      registered: true,
      subscribed: true,
    },
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
      href: isDemo ? "/demo" : "/profile",
      label: user?.name || "Demo User",
      icon: "👤",
      demo: true,
      registered: true,
      subscribed: true,
    },
  ];

  return (
    <nav className="navigation flex flex-col justify-between min-h-screen w-auto pb-2">
      <div className="top-nav flex ">
        <Link href="/demo" className="text-lg font-bold pt-2 pl-4">
          SpenTrace
        </Link>
      </div>
      <ul className="nav-links flex flex-1 flex-col space-y-2 p-4">
        {navLinks.map((link) =>
          link.label === "Transactions" && !id ? null : (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-700 hover:text-blue-500 transition-colors"
            >
              <span className="icon">{link.icon}</span>
              <span className="label">{link.label}</span>
            </Link>
          )
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
