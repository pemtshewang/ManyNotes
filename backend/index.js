const express = require("express");
const app = express();
const path = require("path");
const authenticateToken = require("./middleware/authToken");
const cors = require("cors")

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

// user routes 
app.use("/api", require("./routers/user.routes"));
// authentication route with middleware as authenticateToken
app.use("/api", require("./routers/auth.routes"));
// notes route with jwt authentication
app.use("/api", authenticateToken, require("./routers/note.routes"));

// app.get("/protected", authenticateToken, (req, res) => {
//     res.send(`Hello ${req.user.name}!`)
// });

app.all("*", (req, res, next) => {
  res.status(404).json({
    error: "Resources not found", })
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
