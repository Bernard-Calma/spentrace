"use server";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { BudgetModel } from "@/models/Budget";

// Get Budgets by User ID
const GET = async (
  _: Request,
  context: { params: Promise<{ userId: string }> }
) => {
  console.log("GET /api/budgets/userBudgets/[userId] called");
  try {
    await dbConnect(); // ensure Mongoose is connected
    const userId = (await context.params).userId;
    const budgets = await BudgetModel.find({ owner: userId }).lean(); // plain JS objects
    // console.log("Fetched budgets for userId", userId, ":", budgets);
    return NextResponse.json({ success: true, budgets: budgets || [] });
  } catch (err: any) {
    console.error("Error fetching budgets:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
};

export { GET };
