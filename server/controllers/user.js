import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";
import asyncHandler from "express-async-handler";

export const signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(401).json({ message: "Email or password is missing!!!" });

  const oldUser = await UserModel.findOne({ email });
  if (!oldUser)
    return res.status(404).json({ message: "User doesn't not exist!!!" });

  const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

  if (!isPasswordCorrect)
    return res.status(401).json({ message: "Invalid credential!!!" });

  const token = jwt.sign(
    { email: oldUser.email, id: oldUser._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.status(200).json({ result: oldUser, token });
});

export const signUp = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  if (!email || !password || !firstName || !lastName)
    return res
      .status(400)
      .json({ message: "You miss email or password or firstName or lastName" });
  const oldUser = await UserModel.findOne({ email });
  if (oldUser) return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 12);

  const result = await UserModel.create({
    email,
    password: hashedPassword,
    name: `${firstName} ${lastName}`,
  });

  const token = jwt.sign(
    { email: result.email, id: result._id },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  res.status(201).json({ result: oldUser, token });
});

export const googleSignin = asyncHandler(async (req, res) => {
  const { email, name, token, googleId } = req.body;

  const oldUser = await UserModel.findOne({ email });
  if (oldUser) {
    const result = { _id: oldUser._id.toString(), email, name };
    return res.status(200).json({ result, token });
  }

  const result = await UserModel.create({
    email,
    name,
    googleId,
  });

  res.status(201).json({ result, token });
});
