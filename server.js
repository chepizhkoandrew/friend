// Load environment variables from .env
dotenv.config();
const port = process.env.PORT || 3000;
const axios = require('axios'); // Import axios
const express = require('express');
const cors = require('cors');
const app = express();
const { Configuration, OpenAIApi } = require('openai');
const dotenv = require('dotenv');



// Enable CORS for all routes
app.use(cors());

app.use(express.json());

// Configure OpenAI API



// Load environment variables from .env
dotenv.config();


// Enable CORS for all routes
app.use(cors());
app.use(express.json());


app.post('/api/gpt', async (req, res) => {
    const { prompt } = req.body;
  
    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: "gpt-4",
        messages: [
          { role: "assistant", content: prompt }
        ],
        max_tokens: 100,
        temperature: 0.9
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
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