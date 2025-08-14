import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.post("/travel-plan", async (req, res) => {
  const { destination, duration, budget, travelStyle } = req.body;

  // Build the prompt dynamically based on user inputs
  const prompt = `Create a detailed travel plan for ${duration} days in ${destination}.
Budget: ${budget}.
Preferred travel style: ${travelStyle}.
Include recommended places, activities, and food options.`;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Failed to generate travel plan",
        details: data
      });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: "Failed to generate travel plan",
      details: error.message
    });
  }
});

export default router;
