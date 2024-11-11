const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from gpt.env
dotenv.config({ path: 'gpt.env' });

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

app.post('/api/gpt', async (req, res) => {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not set');
    }

    console.log('Received request:', req.body);

    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: req.body.prompt,
      max_tokens: 50
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    });

    console.log('OpenAI API response:', response.data);

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching dog wisdom:', error.message);
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
    } else {
      console.error('Error details:', error);
    }
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});