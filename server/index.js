const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 5000;

const app = express();

const authRoute = require("./routes/auth");
const productRouter = require("./routes/product");
const orderRouter = require("./routes/order");
const messageRouter = require("./routes/message");
const sessionRouter = require("./routes/session");
const userRouter = require("./routes/user");
const stripeRouter = require("./routes/stripe");

// //MIDDLEWARES
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use("/api/auth", authRoute);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);
app.use("/api/message", messageRouter);
app.use("/api/session", sessionRouter);
app.use("/api/user", userRouter);
app.use("/api/stripe", stripeRouter);

app.get("/", (req, res, next) => {
  res.send("Server is runnning!");
});

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then((result) => {
    console.log("Connected to MongoDB!");
    const server = app.listen(PORT, () => {
      console.log(`Server is running PORT ${PORT}`);
    });

    let rooms = [];

    const io = require("./socket").init(server);
    io.on("connection", (socket) => {
      console.log("Client connected " + socket.id);

      socket.on("joinRoom", (roomId) => {
        console.log(roomId);
        socket.join(roomId);
      });

      socket.on("newRoomChat", (chatId) => {
        socket.join(chatId);
        rooms.push(chatId);

        io.emit("userCreateRoom", chatId);
      });

      socket.on("adminJoinRoomsAvailble", () => {
        socket.join(rooms);
      });

      socket.on("adminJoinRoom", (chatId) => {
        socket.join(chatId);
      });

      socket.on("newMessage", (newMessageRecieved) => {
        const chatId = newMessageRecieved.chatId;
        io.to(chatId).emit("getMessage", {
          userId: newMessageRecieved.sender,
          message: newMessageRecieved.text,
          chatId: newMessageRecieved.chatId,
        });
      });

      socket.on("offchat", (chatId) => {
        io.to(chatId).emit("closeChat", chatId);
        socket.leave(chatId);
        rooms.filter((room) => room !== chatId);
      });

      socket.on("adminOutRoomChat", (chatId) => {
        socket.leave(chatId);
      });

      socket.on("disconnect", () => {
        console.log(socket.id + " disconnected");
      });
    });
  })
  .catch((err) => console.log(err));
