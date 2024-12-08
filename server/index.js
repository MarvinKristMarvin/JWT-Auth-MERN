import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/authRoutes.js";
import mongoose from "mongoose";

dotenv.config();
// db connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Error in database connection", err));

const app = express();

app.use(express.json());
app.use("/", router);

const port = 8000;
app.listen(port, () => console.log(`server running on port ${port}`));
//28.30
