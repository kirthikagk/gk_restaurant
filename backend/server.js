import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

import productRouter from "./routes/productRoutes.js";

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());

// API routes
app.use("/api/backend", productRouter);

// Serve static uploads folder
app.use(
  "/uploads",
  express.static(path.join(__dirname, "..", "frontend", "public", "uploads"))
);

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Connection Successful");

    // Start server only after DB connects
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

// Graceful shutdown
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("🔌 MongoDB connection closed");
  process.exit(0);
});

// Connect DB
connectDB();
