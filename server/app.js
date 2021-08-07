const express = require("express");
const usersRoutes = require("./routes/users");
const chatroomRoutes = require("./routes/chatroom");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  );
  next();
});

app.use("/users", usersRoutes);
app.use("/chatroom", chatroomRoutes);

module.exports = app;
