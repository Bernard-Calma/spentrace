"use client";

import { Navigation } from "@/common";
import { setBudget } from "@/store/features/budgetSlice";
import { setUser } from "@/store/features/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const AppLayoutClient = ({
  children,
  user,
  budget,
}: {
  children: React.ReactNode;
  user: any;
  budget: any;
}) => {
  const dispatch = useDispatch();
  // console.log("User in AppLayoutClient:", user);
  // console.log("Budget in AppLayoutClient:", budget);
  useEffect(() => {
    // You can dispatch actions here if needed
    // e.g., dispatch(setUser(user));
    dispatch(setBudget(budget));
    dispatch(setUser(user));
  }, []);
  return (
    <main className="flex flex min-h-screen">
      <Navigation user={user} />
      {children}
    </main>
  );
};

export default AppLayoutClient;
