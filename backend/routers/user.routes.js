const express = require("express")
const router = express.Router()
const userController = require("../controllers/user.controller")

router.get("/users/", userController.getUser)
router.post("/user/register", userController.createUser)
router.delete("/user/delete/:id", userController.deleteUser)

module.exports = router