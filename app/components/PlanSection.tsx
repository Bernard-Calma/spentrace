const PlanSection = () => {
  const plans = [
    {
      name: "Monthly",
      price: "$4.99 / month",
      priceId: "price_1Rg05cQx9Tvdr5ymNn8vzfo4",
      features: [
        "Unlimited Budgets",
        "Track Expenses",
        "Recurring Bills",
        "Budget Sharing",
        "Reports & Insights",
      ],
    },
    {
      name: "Yearly (15% Off)",
      price: "$20.30 / year",
      priceId: "price_1Rg07yQx9Tvdr5ymbtZU7Ucg",
      features: [
        "Everything in Monthly",
        "Priority Support",
        "Advanced Insights",
      ],
    },
    {
      name: "Lifetime",
      price: "$59.99 (One-time payment)",
      priceId: "price_1Rg08YQx9Tvdr5ymynfcm5HD",
      features: [
        "All Features Unlocked",
        "One-time Payment",
        "Future Updates Included",
      ],
    },
  ];
  return (
    <section id="plans" className="w-full p-6">
      <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
        Choose Your Plan
      </h3>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={plan.priceId}
            className={`border rounded-2xl shadow p-6 flex flex-col items-center justify-between text-center transition hover:shadow-lg ${
              index === 1 ? "border-blue-600" : ""
            }`}
          >
            <div className="mb-4">
              <h4 className="text-2xl font-semibold mb-2">{plan.name}</h4>
              <p className="text-xl font-bold mb-6">{plan.price}</p>
            </div>
            <ul className="text-gray-600 mb-6 space-y-2">
              {plan.features.map((feature, i) => (
                <li key={i}>✔ {feature}</li>
              ))}
            </ul>
            <a
              href="/register"
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Sign Up
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PlanSection;
