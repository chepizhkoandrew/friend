// Import necessary modules
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import OpenAI from "openai";

const app = express();
dotenv.config();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});


// Enable CORS for all routes
app.use(cors());
app.use(express.json());


app.post('/api/gpt', async (req, res) => {
  const { exerciseoneprompt } = req.body;
  if (!exerciseoneprompt) {
    return res.status(400).json({ error: 'Prompt is missing from the request.' });
  }
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'assistant', content: exerciseoneprompt }],
      max_tokens: 50,
    });

    const joke = response.data.choices?.[0]?.message?.content?.trim();
    res.json({ joke });
  } catch (error) {
    console.error('Error fetching joke:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch joke' });
  }
});

