import { BudgetList } from "./components";

const DashboardPage = async () => {
  return (
    <div className="dashboard h-full w-full flex flex-1">
      <BudgetList />
      <p>Test</p>
    </div>
  );
};

export default DashboardPage;
