import express from "express";
import "./DataBase/db.js";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/users/", userRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("\x1b[36m", `Server runniong on port ${port}`);
});
