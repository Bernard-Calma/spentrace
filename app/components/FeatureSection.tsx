const FeatureSection = () => {
  const demoFeatures = [
    "View Sample Budgets",
    "Browse Expense Categories",
    "Preview Charts (limited data)",
  ];

  const freeFeatures = [
    "Create 1 Budget",
    "Add Expenses",
    "Charts & Reports",
    "No Sharing",
    "No Recurring Bills",
    "Access from Any Device",
    "Secure Cloud Storage",
  ];

  return (
    <>
      <section id="features" className="w-full m-auto bg-white py-16 px-6">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Features That Empower Your Budgeting
        </h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <h4 className="text-xl font-semibold mb-2 text-blue-600">
              Shared Budgets
            </h4>
            <p className="text-gray-600">
              Collaborate with family, friends, or colleagues by creating and
              managing budgets together in real-time.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <h4 className="text-xl font-semibold mb-2 text-blue-600">
              Expense Tracking
            </h4>
            <p className="text-gray-600">
              Track your spending habits, categorize expenses, and stay informed
              about where your money goes.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <h4 className="text-xl font-semibold mb-2 text-blue-600">
              Smart Insights
            </h4>
            <p className="text-gray-600">
              Get visual reports and insights to optimize savings and make
              better financial decisions.
            </p>
          </div>
        </div>
      </section>
      <section
        id="demo"
        className="w-full flex flex-col justify-center items-center bg-gray-100 py-16 px-6"
      >
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Free Demo
        </h3>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
          Explore Spendloop instantly with a demo account. Get a feel for how
          budgeting works before registering.
        </p>
        <ul className="max-w-md mx-auto text-gray-700 space-y-2">
          {demoFeatures.map((feature, i) => (
            <li key={i}>✔️ {feature}</li>
          ))}
        </ul>
      </section>
      <section
        id="free"
        className="w-full flex flex-col justify-center items-center bg-white py-16 px-6"
      >
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Free for Registered Users
        </h3>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
          Registered users unlock more features than the demo — for free. Start
          budgeting with charts and insights right away.
        </p>
        <ul className="max-w-md mx-auto flex flex-wrap text-gray-700 space-y-2">
          {freeFeatures.map((feature, i) => (
            <li key={i} className="w-1/2">
              ✔️ {feature}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default FeatureSection;
