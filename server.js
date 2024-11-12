// Import necessary modules
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Environment variable for the OpenAI API key
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Configure OpenAI API
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/api/gpt', async (req, res) => {
  const { exerciseoneprompt } = req.body;
  if (!exerciseoneprompt) {
    return res.status(400).json({ error: 'Prompt is missing from the request.' });
  }
  try {
    const response = await openai.createChatCompletion({
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});