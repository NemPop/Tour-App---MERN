import UserModal from "../models/user.js";
import mongoose from "mongoose";
import expressAsyncHandler from "express-async-handler";

export const getProfile = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const profile = await UserModal.findById(id);
  if (profile) res.status(200).json(profile);
});

export const updateProfile = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, occupation, mobile, imageFile, address } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: `No tour exist with id:${id}` });
  }
  const updatedProfile = {
    name,
    occupation,
    mobile,
    imageFile,
    address,
    _id: id,
  };

  await UserModal.findByIdAndUpdate(id, updatedProfile, { new: true });
  res.status(200).json(updatedProfile);
});
