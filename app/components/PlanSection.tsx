const PlanSection = () => {
  return (
    <section id="plans" className="w-full bg-white p-6">
      <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
        Choose Your Plan
      </h3>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Free Plan */}
        <div className="border rounded-2xl shadow p-6 flex flex-col items-center text-center">
          <h4 className="text-xl font-semibold mb-2">Free</h4>
          <p className="text-gray-600 mb-4">For individuals starting out</p>
          <p className="text-3xl font-bold mb-6">
            $0<span className="text-base text-gray-500">/mo</span>
          </p>
          <ul className="space-y-2 text-gray-600 mb-6">
            <li>✔ 1 Budget</li>
            <li>✔ Expense Tracking</li>
            <li>✔ Demo Access</li>
          </ul>
          <a
            href="/register"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Sign Up
          </a>
        </div>

        {/* Pro Plan */}
        <div className="border-2 border-blue-600 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
          <h4 className="text-xl font-semibold mb-2">Pro</h4>
          <p className="text-gray-600 mb-4">For families and small groups</p>
          <p className="text-3xl font-bold mb-6">
            $9<span className="text-base text-gray-500">/mo</span>
          </p>
          <ul className="space-y-2 text-gray-600 mb-6">
            <li>✔ Unlimited Budgets</li>
            <li>✔ Shared Access</li>
            <li>✔ Priority Support</li>
          </ul>
          <a
            href="/register"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Get Pro
          </a>
        </div>

        {/* Business Plan */}
        <div className="border rounded-2xl shadow p-6 flex flex-col items-center text-center">
          <h4 className="text-xl font-semibold mb-2">Business</h4>
          <p className="text-gray-600 mb-4">For teams and organizations</p>
          <p className="text-3xl font-bold mb-6">
            $29<span className="text-base text-gray-500">/mo</span>
          </p>
          <ul className="space-y-2 text-gray-600 mb-6">
            <li>✔ Everything in Pro</li>
            <li>✔ Advanced Reports</li>
            <li>✔ Team Management</li>
          </ul>
          <a
            href="/register"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Get Business
          </a>
        </div>
      </div>
    </section>
  );
};

export default PlanSection;
