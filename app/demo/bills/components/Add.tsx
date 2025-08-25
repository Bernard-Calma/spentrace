const AddBill: React.FC<{ handleToggleAdd: () => void }> = ({
  handleToggleAdd,
}) => {
  return (
    <div className="overlay flex items-center justify-center">
      <div className="modal-content bg-white p-4 rounded shadow-lg">
        <h2>Add Bill</h2>
        <button onClick={handleToggleAdd}>Close</button>
      </div>
    </div>
  );
};

export default AddBill;
