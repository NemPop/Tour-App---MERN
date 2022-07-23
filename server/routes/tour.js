import express from "express";
import { createTour, getTours } from "../controllers/tour.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.post("/", auth, createTour);
router.get("/", getTours);

export default router;
