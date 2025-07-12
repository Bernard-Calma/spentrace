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
    const savedBudget = localStorage.getItem("budget");
    if (savedBudget) {
      console.log("Saved Budget:", savedBudget);
      setBudget(JSON.parse(savedBudget));
    } else {
      router.push("/demo/create-budget");
    }
  }, []);
  return <div>page</div>;
};

export default DemoPage;
