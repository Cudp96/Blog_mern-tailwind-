import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !email ||
    !password ||
    !username ||
    username === "" ||
    password === "" ||
    email === ""
  ) {
    next(errorHandler(400, "Please Fill all required fields"));
  }
  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
  }
};
