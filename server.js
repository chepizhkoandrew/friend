// Load environment variables from .env
const port = process.env.PORT || 3000;
const axios = require('axios'); // Import axios
const express = require('express');
const cors = require('cors');
const app = express();
const { Configuration, OpenAIApi } = require('openai');
const dotenv = require('dotenv');
dotenv.config();



// Enable CORS for all routes
app.use(cors());

app.use(express.json());

// Configure OpenAI API



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
  
      if (response.data && response.data.choices && response.data.choices.length > 0) {
        res.json(response.data.choices[0].message.content.trim());
      } else {
        throw new Error('Invalid response structure from OpenAI API');
      }
    } catch (error) {
      console.error('Error fetching dog wisdom:', error.message);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      }
      res.status(500).json({ error: "Error fetching dog wisdom" });
    }
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});