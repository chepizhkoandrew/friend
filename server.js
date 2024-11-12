import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

app.post("/api/gpt", async (req, res) => {
  console.log("Received request:", req.body); // Log the incoming request
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is missing from the request." });
  }

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4-0613",
      messages: [{ role: "user", content: prompt }],
    });

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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});