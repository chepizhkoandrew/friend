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


app.get('/health', async (req, res) => {
  try {
    // Check OpenAI API connectivity
    const openaiCheck = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'system', content: 'Health check' }],
      max_tokens: 5,
    });

    res.status(200).json({
      status: 'OK',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      dependencies: {
        openai: 'Connected',
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      dependencies: {
        openai: 'Disconnected',
      },
      error: error.message,
    });
  }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



// Enable CORS for all routes
app.use(cors());
app.use(express.json());


console.log('OpenAI API Key:', process.env.OPENAI_API_KEY ? 'Loaded' : 'Missing');







app.post('/api/gpt', async (req, res) => {
  console.log('Request received on /api/gpt with body:', req.body); // Log request body
  const { exerciseoneprompt } = req.body;

  if (!exerciseoneprompt) {
    console.log('Error: Missing exerciseoneprompt in request body.');
    return res.status(400).json({ error: 'Prompt is missing from the request.' });
  }

  try {
    console.log('Sending request to OpenAI API...');
    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'assistant', content: exerciseoneprompt }],
      max_tokens: 50,
    });

    const joke = response.data.choices?.[0]?.message?.content?.trim();
    console.log('Response from OpenAI API:', joke);
    res.json({ joke });
  } catch (error) {
    console.error('Error occurred while calling OpenAI API:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch data from OpenAI API' });
  }
});

