require("dotenv").config();
const express = require("express");
const app = express();
const authRoutes = require("./routes/auth.js");
const test = require("./routes/protect.js");

const { connectDB } = require("./db.js");

const PORT = process.env.PORT;
app.use(express.json());

connectDB();

// app.get("/", (req, res) => {
//   res.send("Hi");
// });

app.use("/get" , test);

app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is connected at ${PORT}`);
});
