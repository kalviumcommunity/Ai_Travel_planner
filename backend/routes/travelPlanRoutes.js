import express from "express";
import fetch from "node-fetch";

const router = express.Router();

// Zero-shot prompting route (your existing one)
router.post("/travel-plan", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Failed to generate travel plan",
        details: data,
      });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: "Failed to generate travel plan",
      details: error.message,
    });
  }
});

// New One-shot prompting route
router.post("/travel-plan-one-shot", async (req, res) => {
  const { location, duration, activityLevel } = req.body;

  // Compose one-shot prompt with a single example and user input
  const oneShotPrompt = `
Example:
Generate a 2-day travel plan for Paris with moderate activity:
Day 1: Visit the Louvre, lunch at a café, and explore Montmartre.
Day 2: Walk along the Seine river, visit Notre Dame Cathedral, and enjoy a sunset cruise.

Now, generate a ${duration}-day travel plan for ${location} with ${activityLevel} activity:
`;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: oneShotPrompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Failed to generate travel plan",
        details: data,
      });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: "Failed to generate travel plan",
      details: error.message,
    });
  }
});

export default router;
