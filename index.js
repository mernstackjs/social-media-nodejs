require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { authenticateToken } = require("./middleware/authentication");
const port = process.env.PORT;
const app = express();

//midleware

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", authenticateToken, (req, res) => res.send(req.user));
//router

app.use("/api/auth", require("./router/auth"));
app.use("/user", require("./router/user"));

//Listen
app.listen(port, () => console.log(`server is running on port ${port}`));

//connected db
mongoose
  .connect(process.env.MONGODB_URL)
  .then((res) => console.log("db is connected"))
  .catch((err) => console.log(err));
