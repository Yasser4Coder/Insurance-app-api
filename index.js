import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.MONGODB_URL;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.status(201).json({ Message: "Insurence API" });
});
//hi yasser
mongoose
  .connect(DB_URL)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err && "Database connection failed"));

app.listen(PORT, () => {
  console.log("the server is running on http://localhost:" + PORT);
});
