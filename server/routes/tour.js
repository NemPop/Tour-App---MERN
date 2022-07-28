import express from "express";
import {
  createTour,
  getTours,
  getTour,
  getToursByUser,
  deleteTour,
  updateTour,
  getToursBySearch,
  getToursByTag,
  getRelatedTours,
} from "../controllers/tour.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/search", getToursBySearch);
router.get("/", getTours);
router.get("/:id", getTour);
router.get("/tag/:tag", getToursByTag);
router.post("/relatedTours", getRelatedTours);

router.post("/", auth, createTour);
router.delete("/:id", auth, deleteTour);
router.patch("/:id", auth, updateTour);
router.get("/userTours/:id", auth, getToursByUser);

export default router;
