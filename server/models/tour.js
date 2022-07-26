import mongoose from "mongoose";

const tourSchema = mongoose.Schema({
  title: String,
  description: { type: String, require: true },
  name: String,
  creator: String,
  tags: [String],
  imageFile: String,
  createdAd: {
    type: Date,
    default: new Date(),
  },
  likeCount: {
    type: Number,
    default: 0,
  },
});

const TourModal = mongoose.model("Tour", tourSchema);

export default TourModal;
