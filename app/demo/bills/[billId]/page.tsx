const BillItem = async ({
  params,
}: {
  params: Promise<{ billId: string }>;
}) => {
  const { billId } = await params;

  return <div>Bill Item: {billId}</div>;
};

export default BillItem;
