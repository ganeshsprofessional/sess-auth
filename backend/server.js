import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./db/config.js";
import { seedDB } from "./db/seedDB.js";

dotenv.config();

const PORT = process.env.PORT;
const INTERFACE = "0.0.0.0";
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();

app.use(cors());
app.use(express.json());
app.disable("x-powered-by");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Hello from server, hi" });
});

app.get("/data", (req, res) => {
  res.json({ message: "hello from server" });
});

app.listen(PORT, INTERFACE, async () => {
  await connectDB();
  await seedDB();
  console.log(`Listening on http:localhost:${PORT}`);
});
