"use client";
import { useEffect, useState } from "react";
import { LabelInput } from "@/common";

import "../styles.scss";

function CreateBudgetPage() {
  const [newBudget, setNewBudget] = useState({
    budgetName: "",
    owner: "",
    collaborators: [],
    transactions: [],
    totalIncome: 0,
    totalExpenses: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBudget((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    const form = e.target as HTMLFormElement;
    if (!form.checkValidity()) {
      form.reportValidity(); // This triggers native browser validation messages
      return;
    }
    e.preventDefault();
    // TODO: Will use conditional logic to handle demo and registered users
    // Get existing budgets from localStorage
    // Can be replaced with not just demo but actual user
    const demo: Demo = JSON.parse(localStorage.getItem("demo") || "{}");
    // Will be replaced with API call in the future
    // Parse Demo data
    // Proceed with custom logic to create a new budget
    const id = crypto.randomUUID(); // Generate a unique ID for the budget
    const newBudgetData: Budget = {
      ...newBudget,
      id,
    };
    // Add new budget to Demo data
    demo.budgets.push(newBudgetData);
    demo.defaultBudget = newBudgetData;
    // Save updated Demo data to localStorage
    localStorage.setItem("demo", JSON.stringify(demo));
    // Redirect back
    window.location.href = "/demo";
  };

  useEffect(() => {
    // Check if user is allowed to create a budget
    const allowCreateBudget = sessionStorage.getItem("allowCreateBudget");
    if (!allowCreateBudget) {
      window.location.href = "/";
    }
  }, []);
  return (
    <div className="create-budget-page flex flex-col items-center justify-center p-12">
      <h2 className="text-2xl font-bold">🧾 Create New Budget</h2>
      <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <LabelInput
          type="text"
          htmlFor="budgetName"
          text="Budget Name:"
          name="budgetName"
          placeholder="Enter your budget name"
          value={newBudget.budgetName}
          onChange={handleChange}
          required
        />

        <LabelInput
          type="text"
          htmlFor="owner"
          text="Owner:"
          name="owner"
          placeholder="Enter your name"
          value={newBudget.owner}
          onChange={handleChange}
          required
        />

        <LabelInput
          type="text"
          htmlFor="collaborators"
          text="Invite Collaborators (subscription required)"
          name="collaborators"
          placeholder="Enter collaborator names"
          disabled
        />
        <p className=" error">Upgrade to invite others to this budget</p>

        <button
          type="submit"
          className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition-colors"
        >
          Create Budget
        </button>
      </form>
    </div>
  );
}

export default CreateBudgetPage;
