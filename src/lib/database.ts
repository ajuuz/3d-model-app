
import mongoose from "mongoose";

const DATABASE_URI = process.env.DATABASE_URI as string;

if (!DATABASE_URI) {
  throw new Error("Please define the DATABASE_URI environment variable inside .env.local");
}

let cached = (global as any).mongoose;
if (!cached) {
  cached = (global as any).mongoose ={ conn: null ,promise: null };
}

async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose.connect(DATABASE_URI, {
      bufferCommands: false,
    }).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
