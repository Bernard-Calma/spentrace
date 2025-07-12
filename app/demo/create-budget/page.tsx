import LabelInput from "@/common/LabelInput";
import React from "react";
import "../styles.scss";

function CreateBudgetPage() {
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
