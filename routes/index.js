const express = require("express");
const { createUser, login, validateUser } = require("../controller");
const verifyToken = require("../middleware/verifyToken");

//all the routes managed by the express Router
const router = express.Router();

router.get("/", verifyToken, validateUser);
router.post("/sign-up", createUser);
router.post("/login", login);

module.exports = router;
