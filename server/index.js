import express from "express";
import "./DataBase/db.js";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.js";
import tourRouter from "./routes/tour.js";
const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/users/", userRouter);
app.use("/tours/", tourRouter);
app.get("/", (req, res) => {
  res.send("Welcome to tour API");
});
const port = process.env.PORT || 5000;
app.listen(port, (err) => {
  if (err) throw err;
  console.log("\x1b[36m", `Server runniong on port ${port}`);
});
//Hello
