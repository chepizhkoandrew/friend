// Import necessary modules
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import OpenAI from "openai";

const app = express();

// Define your routes here
app.get('/', (req, res) => {
  res.send('Server is running!');
});
const PORT = process.env.PORT || 10000;


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
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

