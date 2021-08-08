require("dotenv").config();
const socket = require("socket.io");
const jwt = require("jsonwebtoken");
const Message = require("./models/Message");
const app = require("./app");
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const server = app.listen(8000, () => {
  console.log("Listen on port 8000");
});

const io = socket(server, {
  cors: {
    origin: "*",
  },
});

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    var decoded = await jwt.verify(token, process.env.PK);
    socket.username = decoded.username;
    //console.log(decoded); // bar
    console.log("auth here!");
    next();
  } catch (err) {
    console.log(err);
  }
});

io.on("connection", (socket) => {
  console.log("Connected " + socket.username);

  socket.on("disconnect", () => {
    console.log("Disconnted: " + socket.username);
  });

  socket.on("message", async ({ message }) => {
    console.log(message);
    console.log(socket.username);
    const newMessage = new Message({
      user: socket.username,
      message: message,
    });
    await newMessage.save();
    io.emit("newMessage", {
      message: newMessage.message,
      timestamp: newMessage.time,
      username: newMessage.user,
    });
  });
});
