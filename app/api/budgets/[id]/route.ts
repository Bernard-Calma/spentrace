"use server";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { BudgetModel } from "@/models/Budget";

// Get Budget By ID
const GET = async (
  _: Request,
  context: { params: Promise<{ id: string }> }
) => {
  console.log("GET /api/budgets/[id] called");
  try {
    await dbConnect(); // ensure Mongoose is connected
    const budget = await BudgetModel.findById((await context.params).id).lean(); // plain JS objects
    // console.log("Fetched budget:", budget);
    return NextResponse.json({ success: true, budget: budget || null });
  } catch (err: any) {
    console.error("Error fetching budget:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
};
export { GET };
