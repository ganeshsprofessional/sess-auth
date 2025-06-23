import mongoose from "mongoose";

export async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI;
  console.log("Connecting to mongoDB");
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to mongodb");
  } catch (e) {
    console.log(`Error : \n${e}`);
  }
}
