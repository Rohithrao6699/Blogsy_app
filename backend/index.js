require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { userRouter } = require("./routes/user");

const app = express();
main();
app.use(cors());
app.use(express.json());

app.use("/user", userRouter);

async function main() {
  console.log(process.env.MONGO_URL);
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(3000, function (err) {
    if (err) console.log(`error while listening${err}`);
    console.log("listening on port 3000");
  });
}
