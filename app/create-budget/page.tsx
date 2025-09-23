"use client";

import { useState } from "react";
import { LabelInput } from "@/common";
import { EmailTagTextarea } from "./components";
import axios from "axios";
import { useSession } from "next-auth/react";

const CreateBudgetPage = () => {
  const [newBudget, setNewBudget] = useState({
    budgetName: "",
    owner: useSession().data?.user?.id || "",
    collaborators: [] as string[],
    transactions: [],
    history: [],
  });

  const [emailList, setEmailList] = useState<string[]>([]);

  const handleEmailsChange = (emails: string[]) => {
    console.log("emails:", emails);
    setEmailList(emails);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBudget({ ...newBudget, [name]: value });
  };

  const handleSubmitNewBudget = (e: React.FormEvent) => {
    e.preventDefault();
    // Change collaborators to emailList state
    newBudget.collaborators = emailList;
    // Handle form submission logic here
    console.log("Creating budget:", newBudget);
    axios
      .post("/api/budgets", newBudget)
      .then((res) => {
        console.log("Budget created successfully:", res.data);
        // Optionally reset form or redirect user
      })
      .catch((err) => {
        console.error("Error creating budget:", err);
      });
  };
  return (
    <div className="create-budget-page min-h-screen flex flex-col items-center justify-center p-12">
      <h2 className="text-2xl font-bold">🧾 Create New Budget</h2>
      <form onSubmit={handleSubmitNewBudget} className="flex flex-col gap-4">
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
        <p className="font-semibold">Collaborators: </p>
        <EmailTagTextarea
          onChange={handleEmailsChange}
          initialEmails={newBudget.collaborators}
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Create Budget
        </button>
      </form>
    </div>
  );
};

export default CreateBudgetPage;
