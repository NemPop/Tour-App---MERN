import expressAsyncHandler from "express-async-handler";
import TourModal from "../models/tour.js";

export const createTour = expressAsyncHandler(async (req, res) => {
  const tour = req.body.updatedTourData;
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
  if (tours) return res.statusCode(200).json(tours);
  return res.status(404).json({ message: "Something went wrong" });
});
