// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/api/gpt', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post('https://api.openai.com/v1/completions', {
      model: "text-davinci-003",
      prompt,
      max_tokens: 100,
      temperature: 0.9
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      }
    });

    res.json(response.data.choices[0].text.trim());
  } catch (error) {
    console.error("Error fetching dog wisdom:", error);
    res.status(500).json({ error: "Error fetching dog wisdom" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});