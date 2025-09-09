"use client";

import { credentialLogin, providerLogin } from "@/actions/auth";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting login form with user:", user);
    const res = await credentialLogin(user.email, user.password);

    console.log("Response from credentialLogin:", res);
    if (!res || res.error) {
      setErrors([res?.error || "Invalid email or password"]);
      return;
    }
    // Redirect to demo page
    // router.push("/demo");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Login to your{" "}
          <span className="font-semibold text-blue-600">Spentrace</span>{" "}
          account.
        </p>

        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="max-w-md mx-auto p-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-bold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              autoComplete="off"
              className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              autoComplete="new-password"
              className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Show password errors live */}
          {errors.length > 0 && (
            <ul className="text-red-600 text-sm space-y-1">
              {errors.map((err, i) => (
                <li key={i}>⚠️ {err}</li>
              ))}
            </ul>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500 text-sm">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Social logins */}
        <div className="flex flex-col space-y-3 items-center">
          <img
            src="/icons/google-sign-in.svg"
            alt="Google sign-in"
            className="w-64 h-10 object-contain cursor-pointer hover:transform hover:scale-105 transition"
            onClick={() => providerLogin("google")}
          />
          <img
            src="/icons/github-sign-in.png"
            alt="GitHub sign-in"
            className="w-64 h-10 object-contain cursor-pointer hover:transform hover:scale-105 transition"
            onClick={() => providerLogin("github")}
          />
          <img
            src="/icons/linkedin-sign-in.png"
            alt="LinkedIn sign-in"
            className="w-full h-7 object-contain cursor-pointer hover:transform hover:scale-105 transition"
            onClick={() => providerLogin("linkedin")}
          />
        </div>

        {/* Login link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
