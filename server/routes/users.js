const router = require("express").Router();
const usersControllers = require("../controllers/users");

router.post("/login", usersControllers.login);
router.post("/register", usersControllers.register);

module.exports = router;
