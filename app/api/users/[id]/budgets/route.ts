"use server";

import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { User } from "@/models/User";

// POST /api/users/[id]/budgets
const POST = async (
  req: Request,
  context: { params: Promise<{ id: string }> }
) => {
  try {
    await dbConnect(); // ensure Mongoose is connected

    // ✅ await params here
    const { id: userId } = await context.params;

    const body = await req.json();
    const { budgetId } = body;

    if (!budgetId) {
      return NextResponse.json(
        { success: false, message: "budgetId is required" },
        { status: 400 }
      );
    }

    // Add budgetId to user's budgets array
    await User.findByIdAndUpdate(userId, { $addToSet: { budgets: budgetId } });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Error adding budget to user:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
};

export { POST };
