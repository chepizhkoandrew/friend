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
  console.log('Received request on /api/gpt');
  const { exerciseoneprompt } = req.body;
  if (!exerciseoneprompt) {
    console.log('Prompt is missing from the request.');
    return res.status(400).json({ error: 'Prompt is missing from the request.' });
  }
  try {
    console.log('Sending request to OpenAI API with prompt:', exerciseoneprompt);
    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'assistant', content: exerciseoneprompt }],
      max_tokens: 50,
    });

    const joke = response.data.choices?.[0]?.message?.content?.trim();
    console.log('Received response from OpenAI API:', joke);
    res.json({ joke });
  } catch (error) {
    console.error('Error fetching joke:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch joke' });
  }
});

