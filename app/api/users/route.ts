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
  console.log("Received POST request to /api/users");
  try {
    const client = await clientPromise;
    const db = client.db("spentrace");

    const newUser = await req.json();
    delete newUser.verifyPassword;
    console.log("Received new user data:", newUser);
    const result = await db.collection("users").insertOne(newUser);

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
