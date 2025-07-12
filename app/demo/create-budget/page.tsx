"use client";
import { useState } from "react";
import { LabelInput } from "@/common";
import "../styles.scss";

function CreateBudgetPage() {
  const [newBudget, setNewBudget] = useState({
    budgetName: "",
    owner: "",
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
    if (form.checkValidity()) {
      return;
    } else {
      e.preventDefault();
      console.log("New Budget Created:", newBudget);
    }
  };
  return (
    <div className="create-budget-page flex flex-col items-center justify-center p-12">
      <h2 className="text-2xl font-bold">🧾 Create Your Budget</h2>
      <form action="" className="flex flex-col gap-4">
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
          onClick={handleSubmit}
        >
          Create Budget
        </button>
      </form>
    </div>
  );
}

export default CreateBudgetPage;
