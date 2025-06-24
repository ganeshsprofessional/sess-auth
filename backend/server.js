import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import connectStore from "connect-mongo";
import mongoose from "mongoose";

import { connectDB } from "./db/config.js";
import { seedDB } from "./db/seedDB.js";

import userRouter from "./routes/userRoutes.js";

dotenv.config();

const NODE_ENV = process.env.NODE_ENV;

const PORT = process.env.PORT;
const INTERFACE = "0.0.0.0";
const MONGODB_URI = process.env.MONGODB_URI;

const SESS_NAME = process.env.SESS_NAME;
const SESS_SECRET = process.env.SESS_SECRET;
const SESS_LIFETIME = process.env.SESS_LIFETIME;

const app = express();
// const MongoStore = new connectStore(session, MONGODB_URI);
app.use(
  cors({
    origin: (origin, callback) => {
      console.log("Request Origin:", origin);
      callback(null, true); // Allow the request
    },
    credentials: true,
  })
);

app.use(express.json());
app.disable("x-powered-by");
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    name: SESS_NAME || "my_sess",
    secret: SESS_SECRET || "my_sess",
    saveUninitialized: false,
    resave: false,
    store: connectStore.create({
      mongoUrl: String(MONGODB_URI),
      connection: mongoose.connection,
      collection: "session",
      ttl: parseInt(SESS_LIFETIME) / 1000,
    }),
    cookie: {
      name: "my_cookie",
      sameSite: true,
      secure: NODE_ENV === "production",
      maxAge: parseInt(SESS_LIFETIME),
    },
  })
);

app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.json({ message: "Hello from server, hi" });
});

app.get("/data", (req, res) => {
  res.json({ message: "hello from server" });
});

app.listen(PORT, INTERFACE, async () => {
  await connectDB();
  // await seedDB();
  console.log(`Listening on http:localhost:${PORT}`);
});
