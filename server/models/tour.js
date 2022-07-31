import mongoose from "mongoose";

const tourSchema = mongoose.Schema({
  title: String,
  description: { type: String, require: true },
  name: String,
  creator: String,
  category: String,
  tags: [String],
  imageFile: String,
  createdAd: {
    type: Date,
    default: new Date(),
  },
  likes: {
    type: [String],
    default: [],
  },
});

const TourModal = mongoose.model("Tour", tourSchema);

export default TourModal;
