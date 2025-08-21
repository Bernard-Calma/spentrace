import { BillsHeader, BillsList } from "./components";
import "./styles.scss";

const Bills = () => {
  return (
    <div className="bills-page w-full h-full flex flex-col flex-1 justify-start">
      <BillsHeader />
      <div className="bills-body">
        <div className="flex justify-between bg-gray-300">
          <p>Due Date</p>
          <p>Name</p>
          <p>Amount</p>
        </div>
        <BillsList />
      </div>
    </div>
  );
};

export default Bills;
