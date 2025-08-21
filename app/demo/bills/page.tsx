import { BillsHeader } from "./components";
import "./styles.scss";

const Bills = () => {
  return (
    <div className="bills-page w-full h-full flex flex-col flex-1 justify-start">
      <BillsHeader />
      <div className="bills-body">
        <p>Your bills will be displayed here.</p>
      </div>
    </div>
  );
};

export default Bills;
