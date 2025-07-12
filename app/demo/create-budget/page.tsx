import LabelInput from "@/common/LabelInput";
import React from "react";

function CreateBudgetPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h2 className="text-2xl font-bold">🧾 Create Your Budget</h2>
      <form action="" className="flex flex-col gap-4">
        <LabelInput
          type="text"
          htmlFor="budgetName"
          text="Budget Name:"
          name="budgetName"
          placeholder="Enter your budget name"
        />

        <LabelInput
          type="text"
          htmlFor="owner"
          text="Owner:"
          name="owner"
          placeholder="Enter your name"
        />

        <LabelInput
          type="text"
          htmlFor="collaborators"
          text="Collaborators:"
          name="collaborators"
          placeholder="Enter collaborator names"
          disabled
        />
        <p className="text-gray-500">Upgrade to invite others to this budget</p>

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
