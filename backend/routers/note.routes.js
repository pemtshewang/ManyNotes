const express = require("express")
const route = express.Router()
const noteController = require("../controllers/note.controller")

route.get("/user/:id/notes/", noteController.getNotes);
route.post("/user/:id/note/create", noteController.postNote);
route.patch("/user/:id/note/update/:noteId", noteController.updateNote);
route.delete("/user/:id/note/delete/:noteId", noteController.deleteNote);

module.exports = route
