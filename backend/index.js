// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Route: Example AI Travel Planner endpoint
app.post("/plan-trip", async (req, res) => {
  try {
    const { destination, days, preferences } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Create a ${days}-day travel itinerary for ${destination} focusing on ${preferences}`;

    const result = await model.generateContent(prompt);

    res.json({ itinerary: result.response.text() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate itinerary" });
  }
});

app.get("/", (req, res) => {
  res.send("AI Travel Planner Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
