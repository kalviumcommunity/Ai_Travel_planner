import express from "express";
import fetch from "node-fetch";

const router = express.Router();

// Zero-shot prompting route
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

// One-shot prompting route
router.post("/travel-plan-one-shot", async (req, res) => {
  const { location, duration, activityLevel } = req.body;

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

// Multi-shot prompting route
router.post("/travel-plan-multi-shot", async (req, res) => {
  const { location, duration, activityLevel } = req.body;

  const multiShotPrompt = `
Example 1:
Generate a 2-day travel plan for Paris with moderate activity:
Day 1: Visit the Louvre, lunch at a café, explore Montmartre.
Day 2: Walk along the Seine river, visit Notre Dame Cathedral, sunset cruise.

Example 2:
Generate a 3-day travel plan for Tokyo with high activity:
Day 1: Visit Shibuya Crossing, explore Harajuku, try street food.
Day 2: Tour Akihabara electronics district, visit Tokyo Tower.
Day 3: Day trip to Mt. Fuji, return for dinner in Shinjuku.

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
              parts: [{ text: multiShotPrompt }],
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
