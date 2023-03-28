const router = require("express").Router();
const authController = require("../controllers/auth.controller");

router.post("/user/login", authController.login);

module.exports = router;