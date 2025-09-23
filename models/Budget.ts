"use server";

import mongoose, { Schema, Document, model, models } from "mongoose";

export interface Budget extends Document {
  id: string;
  budgetName: string;
  owner: string; // User Id
  collaborators: string[]; // Array of User Emails
  transactions: string[]; // Array of Transaction Ids / change to Transcation[]
  history: string[]; // Array of Transaction Ids (historical) / change to Transcation[]
}
const BudgetSchema: Schema<Budget> = new Schema(
  {
    budgetName: { type: String, required: true },
    owner: { type: String, required: true },
    collaborators: { type: [String], required: true },
    transactions: { type: [String], required: true },
    history: { type: [String], required: true },
  },
  { timestamps: true }
);

export const BudgetModel =
  (models.Budget as mongoose.Model<Budget>) ||
  model<Budget>("Budget", BudgetSchema);
