const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

const cors = require('cors');
app.use(cors());

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/api/gpt', async (req, res) => {
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-4',
        messages: [{ role: 'user', content: req.body.prompt }],
        max_tokens: 50
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        }
      });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching dog wisdom:', error);
    res.status(500).json({ error: 'Error fetching dog wisdom' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});