import Joi from "joi";
import express from "express";
import User from "../models/user.js";
import { signUp } from "../validations/user.js";
import { parseError, sessionizeUser } from "../utils/helpers.js";
const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ message: "Username or password is required" });
      return;
    }
    // console.log(req.body);
    // await Joi.validate({ username, password }, signUp);
    const newUser = new User({ username, password });
    await newUser.save();
    res.send({ userId: newUser.id, username });
  } catch (err) {
    res.status(400).send(err);
  }
});

userRouter.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ message: "Username or password is required" });
      return;
    }
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).json({ message: "Invalid username or password" });
      return;
    }
    if (!(await user.comparePassword(password))) {
      res.status(404).json({ message: "Invalid username or password" });
      return;
    }

    const sessionUser = sessionizeUser(user);
    req.session.user = sessionUser;

    res.status(200);
    res.json({ sessionUser });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
});

userRouter.get("/me", (req, res) => {
  if (req.session.user) {
    res.json({ user: req.session.user });
    return;
  }
  res.json({ message: "Invaild user" });
});

export default userRouter;
