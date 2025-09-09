"use server";

import clientPromise from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

// Get Users api/users
const GET = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("spentrace");

    const users = await db.collection("users").find({}).toArray();

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

// POST /api/users
const POST = async (req: Request) => {
  try {
    const client = await clientPromise;
    const db = client.db("spentrace");

    const newUser = await req.json();
    delete newUser.verifyPassword;

    const passwordHash = await bcrypt.hash(newUser.password, 10);
    newUser.password = passwordHash;

    const result = await db.collection("users").insertOne(newUser);

    const userResponse = {
      id: result.insertedId.toString(),
      username: newUser.username,
      email: newUser.email,
      budgets: [],
      defaultBudget: null,
      subscribed: false,
      bills: [],
      isDemo: false,
    };

    return NextResponse.json({ success: true, user: userResponse });
  } catch (err: any) {
    console.error("Error occurred:", err);

    // Check if it's a Mongo duplicate key error
    const mongoError = err as { code?: number; keyValue?: Record<string, any> };
    if (mongoError.code === 11000 && mongoError.keyValue) {
      const field = Object.keys(mongoError.keyValue)[0]; // e.g. 'username' or 'email'
      const value = mongoError.keyValue[field];
      return NextResponse.json(
        { success: false, message: `${field} "${value}" already exists` },
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
