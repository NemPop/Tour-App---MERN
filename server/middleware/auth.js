import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";
import "dotenv/config";

const secret = "12345";
const auth = expressAsyncHandler(async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const isCustomAuth = token.length < 500;
  let decodedData;

  if (token && isCustomAuth) {
    decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decodedData?.id;
  } else {
    decodedData = jwt.decode(token);

    const googleId = decodedData?.sub;
    const user = await UserModel.findOne({ googleId });
    req.userId = user?._id;
  }
  next();
});

export default auth;
