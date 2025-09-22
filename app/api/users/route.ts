"use server";

import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import dbConnect from "@/lib/db";
import { User } from "@/models/User";

// GET /api/users
const GET = async () => {
  try {
    await dbConnect(); // ensure Mongoose is connected

    const users = await User.find({}).lean(); // plain JS objects
    return NextResponse.json({ success: true, users });
  } catch (err: any) {
    console.error("Error fetching users:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
};

// POST /api/users
const POST = async (req: Request) => {
  try {
    await dbConnect(); // ensure Mongoose is connected

    const body = await req.json();
    delete body.verifyPassword;

    const passwordHash = await bcrypt.hash(body.password, 10);
    body.password = passwordHash;

    const newUser = await User.create(body);

    return NextResponse.json({
      success: true,
      user: {
        id: newUser._id.toString(),
        username: newUser.username,
        email: newUser.email,
        budgets: newUser.budgets,
        defaultBudget: newUser.defaultBudget,
        subscribed: newUser.subscribed,
        bills: newUser.bills,
        isDemo: newUser.isDemo,
      },
    });
  } catch (err: any) {
    console.error("Error creating user:", err);

    // Handle duplicate keys (username or email)
    if (err.code === 11000 && err.keyValue) {
      const field = Object.keys(err.keyValue)[0];
      const value = err.keyValue[field];
      return NextResponse.json(
        {
          success: false,
          message: `${field} "${value}" already exists`,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
};

export { GET, POST };
