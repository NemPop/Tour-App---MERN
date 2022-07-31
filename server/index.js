import express from "express";
import "./DataBase/db.js";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.js";
import tourRouter from "./routes/tour.js";
import profileRouter from "./routes/profile.js";
import { Server } from "socket.io";
const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

let onlineUsers = [];

const addNewUser = (username, socketId) => {
  !onlineUsers.some((user) => user.username === username) &&
    onlineUsers.push({ username, socketId });
};

const removeUser = (socketId) => {
  return onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (username) => {
  return onlineUsers.find((user) => user.username === username);
};

io.on("connection", (socket) => {
  socket.on("newUser", (username) => {
    addNewUser(username, socket.id);
  });

  socket.on("sendNotification", ({ senderName, receiverName }) => {
    const receiver = getUser(receiverName);

    io.to(receiver.socketId).emit("getNotification", {
      senderName,
    });
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

app.use("/users/", userRouter);
app.use("/tours/", tourRouter);
app.use("/profile/", profileRouter);
app.get("/", (req, res) => {
  res.send("Welcome to tour API");
});

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
io.listen(server);
//Hello
