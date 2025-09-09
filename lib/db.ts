import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) throw new Error("Please define MONGO_URI in .env");

let cached: {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
} = (global as any)._mongooseCache || { conn: null, promise: null };

if (process.env.NODE_ENV === "development") {
  if (!(global as any)._mongooseCache) (global as any)._mongooseCache = cached;
}

async function dbConnect() {
  if (cached.conn) return cached.conn; // already connected

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
