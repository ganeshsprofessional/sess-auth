import Joi from "joi";
import express from "express";
import User from "../models/user.js";
import { signUp } from "../validations/user.js";
const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    // console.log(req.body);
    // await Joi.validate({ username, password }, signUp);
    const newUser = new User({ username, password });
    await newUser.save();
    res.send({ userId: newUser.id, username });
  } catch (err) {
    res.status(400).send(err);
  }
});

export default userRouter;
