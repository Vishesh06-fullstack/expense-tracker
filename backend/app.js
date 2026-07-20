require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const authRoutes = require("./routes/auth.js");
const test = require("./routes/protect.js");
const expenseRoutes = require("./routes/expense.js")
const { connectDB } = require("./db.js");

app.use(cors());
const PORT = process.env.PORT;
app.use(express.json());

connectDB();

app.use("/get" , test);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/expense" , expenseRoutes);

app.listen(PORT, () => {
  console.log(`Server is connected at ${PORT}`);
});
