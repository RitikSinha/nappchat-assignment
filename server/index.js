const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = express.Router();
const cors = require("cors");
dotenv.config();

// importing all the routes
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

app.get("/", (req, res) => {
  res.send("app is running!");
});

app.listen(8800, () => {
  console.log("Backend server is running!");
});
