import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import travelPlanRoutes from "./routes/travelPlanRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

console.log("Gemini API Key Loaded?", !!process.env.GEMINI_API_KEY);

app.use("/api", travelPlanRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
