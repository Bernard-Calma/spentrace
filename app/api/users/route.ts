import clientPromise from "@/lib/db";
import { NextResponse } from "next/server";

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

    const newUser = req.body;
    const result = await db.collection("users").insertOne(newUser as {});

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export { GET, POST };
