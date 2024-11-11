// Load environment variables from .env
const port = process.env.PORT || 3000;

const openai = new OpenAIApi(configuration);

const express = require('express');
const app = express();
const { Configuration, OpenAIApi } = require('openai');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();







// Enable CORS for all routes
app.use(cors());

app.use(express.json());

// Configure OpenAI API


app.post('/api/gpt', async (req, res) => {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not set');
    }

    console.log('Received request:', req.body);

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: req.body.prompt,
      max_tokens: 50,
    });

    console.log('OpenAI API response:', response.data);

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching dog wisdom:', error.message);
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
      if (error.response.status === 429 || error.response.data.error.code === 'insufficient_quota') {
        res.status(429).json({ error: 'Quota Exceeded', message: 'You have exceeded your current quota. Please check your plan and billing details.' });
        return;
      }
    } else {
      console.error('Error details:', error);
    }
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});