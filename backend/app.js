const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "backend/config/config.env" });
}
//using middlewares
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
//importing routes

const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api/v1", postRoutes);
app.use("/api/v1", userRoutes);


app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req,res) => {
  res.send(path.resolve(__dirname, "../frontend/build/index.html"));
})

module.exports = app;
