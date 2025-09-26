import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { User } from "@/models/User";

// GET /api/users/[id]
const GET = async (
  _: Request,
  context: { params: Promise<{ id: string }> }
) => {
  console.log("GET /api/users/[id] called");
  try {
    await dbConnect(); // ensure Mongoose is connected

    const user = await User.findById((await context.params).id).lean(); // plain JS objects
    // console.log("Fetched user:", user);
    return NextResponse.json({ success: true, user: user || null });
  } catch (err: any) {
    console.error("Error fetching user:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
};

export { GET };
