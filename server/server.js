require("dotenv").config();
const socket = require("socket.io");
const jwt = require("jsonwebtoken");

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
    socket.userId = decoded.id;
    //console.log(decoded); // bar
    console.log("auth here!");
    next();
  } catch (err) {
    console.log(err);
  }
});

io.on("connection", (socket) => {
  console.log("Connected " + socket.userId);

  socket.on("disconnect", () => {
    console.log("Disconnted: " + socket.userId);
  });

  socket.on("message", ({ message }) => {
    console.log(message);
    console.log(socket.userId);
    io.emit("newMessage", { message });
  });
});
