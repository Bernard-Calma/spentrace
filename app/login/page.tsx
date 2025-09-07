"use client";

import { login } from "@/utils/auth";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

const validatePassword = (password: string, repeatPassword: string) => {
  const errors: string[] = [];

  // Regex for validation
  const passwordRegex = {
    length: /^.{8,}$/, // at least 8 chars
    upper: /[A-Z]/, // at least one uppercase
    lower: /[a-z]/, // at least one lowercase
    number: /[0-9]/, // at least one number
    special: /[^A-Za-z0-9]/, // at least one special character
  };

  if (!passwordRegex.length.test(password)) {
    errors.push("At least 8 characters long");
  }
  if (!passwordRegex.upper.test(password)) {
    errors.push("At least one uppercase letter");
  }
  if (!passwordRegex.lower.test(password)) {
    errors.push("At least one lowercase letter");
  }
  if (!passwordRegex.number.test(password)) {
    errors.push("At least one number");
  }
  if (!passwordRegex.special.test(password)) {
    errors.push("At least one special character");
  }
  if (password && repeatPassword && password !== repeatPassword) {
    errors.push("Passwords do not match");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);

    // validate on each change
    if (name === "password" || name === "repeatPassword") {
      const { errors } = validatePassword(
        updatedForm.password,
        updatedForm.repeatPassword
      );
      setErrors(errors);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const { isValid, errors } = validatePassword(
    //   formData.password,
    //   formData.repeatPassword
    // );

    // if (!isValid) {
    //   setErrors(errors);
    //   return;
    // }

    alert("✅ Login successful! \n Redirecting to Demo");
    // Redirect to demo page
    router.push("/demo");
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
              value={formData.email}
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
              value={formData.password}
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
        <div className="flex flex-col space-y-3">
          <img
            src="/icons/google-sign-in.svg"
            alt="Google sign-in"
            className="w-full h-10 cursor-pointer hover:transform hover:scale-105 transition"
            onClick={() => login()}
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
