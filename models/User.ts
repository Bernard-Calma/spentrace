"use server";

import mongoose, { Schema, Document, model, models } from "mongoose";

export interface User extends Document {
  id: string;
  username: string;
  email: string;
  password: string;
  image: string;
  emailVerified: boolean | null;
  bills: string[]; // Bill[]
  budgets: string[]; // Array of Budget Ids
  defaultBudget: string; // Budget Id
  subscribed: string; // Stripe Customer ID
}

const UserSchema: Schema<User> = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    image: { type: String, default: "" },
    emailVerified: { type: Boolean, default: false },
    bills: { type: [String], default: [] },
    budgets: { type: [String], default: [] },
    defaultBudget: { type: String, default: "" },
    subscribed: { type: String, default: "" },
  },
  { timestamps: true }
);

export const User = models.User || model<User>("User", UserSchema);
