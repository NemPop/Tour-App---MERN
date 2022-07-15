import mongoose from "mongoose";
import "dotenv/config";

try {
  const client = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("\x1b[35m", `Connected to MongoDB @ ${client.connection.host}`);
} catch (error) {
  console.log(error);
}
