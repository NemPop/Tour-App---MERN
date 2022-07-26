import expressAsyncHandler from "express-async-handler";
import TourModal from "../models/tour.js";
import mongoose from "mongoose";

export const createTour = expressAsyncHandler(async (req, res) => {
  const tour = req.body;
  const newTour = new TourModal({
    ...tour,
    creator: req.userId,
    createdAt: new Date().toISOString,
  });

  await newTour.save();

  if (newTour) return res.status(201).json(newTour);
  return res.status(404).json({ message: "Something went wrong" });
});

export const getTours = expressAsyncHandler(async (req, res) => {
  const tours = await TourModal.find();
  if (tours) return res.status(200).json(tours);
  return res.status(404).json({ message: "Something went wrong" });
});

export const getTour = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const tour = await TourModal.findById(id);

  if (tour) {
    res.status(200).json(tour);
  } else {
    res.status(404).json({ message: "Something went wrong" });
  }
});

export const getToursByUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "User doesn't exist" });
  }

  const userTours = await TourModal.find({ creator: id });
  res.status(200).json(userTours);
});
