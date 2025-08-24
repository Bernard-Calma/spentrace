const PlanSection = () => {
  const plans = [
    {
      name: "Monthly",
      price: "$4.99 / month",
      priceId: "price_1Rg05cQx9Tvdr5ymNn8vzfo4",
    },
    {
      name: "Yearly (15% Off)",
      price: "$20.30 / year",
      priceId: "price_1Rg07yQx9Tvdr5ymbtZU7Ucg",
    },
    {
      name: "Lifetime",
      price: "$59.99 (One-time payment)",
      priceId: "price_1Rg08YQx9Tvdr5ymynfcm5HD",
    },
  ];
  return (
    <section id="plans" className="w-full p-6">
      <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
        Choose Your Plan
      </h3>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Free Plan */}
        {plans.map((plan) => (
          <div
            key={plan.priceId}
            className="border rounded-2xl shadow p-6 flex flex-col items-center text-center"
          >
            <h4 className="text-2xl font-semibold mb-2">{plan.name}</h4>
            <p className="text-xl font-bold mb-6">{plan.price}</p>
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
