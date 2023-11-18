require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const port = process.env.PORT;
const app = express();

//midleware

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Listen
app.listen(port, () => console.log(`server is running on port ${port}`));

//connected db
mongoose
  .connect(process.env.MONGODB_URL)
  .then((res) => console.log("db is connected"))
  .catch((err) => console.log(err));
