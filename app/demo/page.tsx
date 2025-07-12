"use client";

import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const DemoPage = () => {
  const router = useRouter();
  const [budget, setBudget] = useState({
    budgetName: "",
    owner: "",
    collaborators: "",
  });

  useEffect(() => {
    if (budget.budgetName === "") {
      router.push("/demo/create-budget");
    }
  }, [budget]);
  return <div>page</div>;
};

export default DemoPage;
