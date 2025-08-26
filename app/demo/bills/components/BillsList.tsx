"use client";

const BillsList = () => {
  return (
    <div>
      <ul>
        <li>
          <div className="px-2 flex items-center justify-between border-b border-gray-200 text-sm hover:bg-gray-50">
            <p className="flex-1 text-center">07/10</p>
            <p className="flex-1 text-center">Bday</p>
            <p className="flex-1 text-center">$100</p>
            <div className="flex-1 flex justify-center align-center gap-2 text-center">
              <p>Unpaid</p>
              <input type="checkbox" />
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default BillsList;
