import React from "react";

function CreateBudgetPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h2>🧾 Create Your Budget</h2>
      <form action="" className="flex flex-col gap-4">
        <label htmlFor="budgetName" className="font-semibold">
          Budget Name:
        </label>
        <input
          className="border border-gray-300 rounded p-2"
          type="text"
          id="budgetName"
          placeholder="Enter your budget name"
        />
        <br />
        <label htmlFor="owner" className="font-semibold">
          Owner:
        </label>
        <input
          className="border border-gray-300 rounded p-2"
          type="text"
          id="owner"
          placeholder="Enter the owner's name"
        />
        <br />
        <label htmlFor="collaborators" className="font-semibold">
          Collaborators:
        </label>
        <input
          className="border border-gray-300 rounded p-2 disabled:bg-gray-100"
          type="text"
          id="collaborators"
          placeholder="Enter collaborator names"
          disabled
        />
        <p className="text-gray-500">Upgrade to invite others to this budget</p>
        <br />
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
