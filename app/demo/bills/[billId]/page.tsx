import Link from "next/link";
import { BillDetails } from "./components";

const BillItem = async ({
  params,
}: {
  params: Promise<{ billId: string }>;
}) => {
  const { billId } = await params;

  if (billId) {
    return (
      <div className="bill-item w-full flex items-center justify-center">
        <BillDetails billId={billId} />
      </div>
    );
  }
};

export default BillItem;
