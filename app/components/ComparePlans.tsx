"use client";

import { motion } from "framer-motion";

const ComparePlans = () => {
  const plans = ["Demo", "Free Registered", "Subscribed"];
  const features = [
    {
      title: "Budgets",
      values: ["View Only", "1 Budget", "Unlimited Budgets"],
    },
    {
      title: "Budget Sharing",
      values: ["❌", "❌", "✅"],
    },
    {
      title: "Recurring Bills",
      values: ["❌", "❌", "✅"],
    },

    {
      title: "Collaborators",
      values: ["❌", "❌", "✅"],
    },
    {
      title: "Charts & Reports",
      values: ["❌", "✅", "✅"],
    },
    {
      title: "Support",
      values: ["Community Only", "Basic", "Priority"],
    },
  ];

  return (
    <section className="hidden md:block w-full py-16 px-6 bg-white">
      <motion.h3
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl font-bold text-center text-gray-800 mb-12"
      >
        Compare Plans
      </motion.h3>

      <div className="overflow-x-auto max-w-6xl mx-auto border border-gray-100 rounded-2xl shadow-md">
        <table className="w-full border-collapse rounded-2xl overflow-hidden shadow bg-white">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-4 text-left">Features</th>
              {plans.map((plan) => (
                <th key={plan} className="p-4 text-center">
                  {plan}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature, i) => (
              <motion.tr
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-4 font-medium text-gray-700">
                  {feature.title}
                </td>
                {feature.values.map((val, j) => (
                  <td key={j} className="p-4 text-center text-gray-600">
                    {val}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ComparePlans;
