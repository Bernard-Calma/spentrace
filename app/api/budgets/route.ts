"use server";

import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { BudgetModel } from "@/models/Budget";

// POST /api/budgets
const POST = async (req: Request) => {
  try {
    await dbConnect(); // ensure the DB is connected

    const body = await req.json();

    // console.log("Incoming budget data:", body);

    // Create and save
    const newBudget = await BudgetModel.create(body);

    // Return the actual saved doc
    return NextResponse.json({ success: true, budget: newBudget });
  } catch (err: any) {
    console.error("Error creating budget:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
};

export { POST };
