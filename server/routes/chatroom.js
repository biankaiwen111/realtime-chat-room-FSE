const router = require("express").Router();
const chatroomControllers = require("../controllers/chatroom");

const isAuth = require("../middlewares/is-auth");

router.get("/", isAuth, chatroomControllers.getChatroom);

module.exports = router;
