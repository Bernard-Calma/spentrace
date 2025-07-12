"use client";

import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import "./styles.scss";

const DemoPage = () => {
  const router = useRouter();
  const [budget, setBudget] = useState({
    budgetName: "",
    owner: "",
    collaborators: "",
  });

  useEffect(() => {
    // Check if budget data exists in localStorage
    const savedBudget = localStorage.getItem("budget");
    if (savedBudget) {
      console.log("Saved Budget:", savedBudget);
      setBudget(JSON.parse(savedBudget));
    } else {
      // If no budget data, redirect to create budget page
      sessionStorage.setItem("allowCreateBudget", "true");
      router.push("/demo/create-budget");
    }
  }, []);
  return <div>page</div>;
};

export default DemoPage;
