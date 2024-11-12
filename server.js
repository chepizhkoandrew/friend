// Load environment variables from .env
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});








const port = process.env.PORT || 3000;
import express from 'express';
import axios from 'axios';
const app = express();
import dotenv from 'dotenv';
dotenv.config();



// Enable CORS for all routes
app.use(cors());

app.use(express.json());

// Configure OpenAI API



// Enable CORS for all routes
app.use(cors());
app.use(express.json());


app.post("/api/gpt", async (req, res) => {
  console.log("Received request:", req.body); // Log the incoming request
  const { prompt } = req.body;

  if (!prompt) {
      return res.status(400).json({ error: "Prompt is missing from the request." });
  }


const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: "Say this is a test" }],
    model: "gpt-4o-mini",
});


  try {
      const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
              model: "gpt-4-0613",
              messages: [{ role: "user", content: prompt }],
          },
          {
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
              },
          }
      );

      const choice = response.data.choices?.[0]?.message?.content;

      res.json({ text: choice ? choice.trim() : "No wisdom available." });
  } catch (error) {
      console.error("Error fetching dog wisdom:", error.message);

      if (error.response) {
          console.error("Error details:", error.response.data);
      }

      res.status(500).json({ error: "Error fetching dog wisdom" });
  }
});


app.post("/first", async (req, res) => {
  const { option1, option2 } = req.body;

  if (!option1 || !option2) {
      return res.status(400).json({ error: "Both option1 and option2 are required." });
  }

  const prompt = `If you were a dog psychologist loving Bill Murray and Monty Python and being the smartest person in the dog world, what advice would you give to a stranger who is now at ${option1} feeling ${option2} inside?`;

  try {
      const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
              model: "gpt-4-0613",
              messages: [{ role: "assistant", content: prompt }],
          },
          {
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
              },
          }
      );

      const wisdom = response.data.choices?.[0]?.message?.content;

      if (!wisdom) {
          throw new Error("OpenAI did not return wisdom.");
      }

      res.json({ wisdom: wisdom.trim() });
  } catch (error) {
      console.error("Error fetching wisdom from OpenAI:", error.message);

      if (error.response) {
          console.error("Error details:", error.response.data);
      }

      res.status(500).json({ error: "Error fetching wisdom." });
  }
});






app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});