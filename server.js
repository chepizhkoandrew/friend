// Import necessary modules
const express = import('express');
const axios = import('axios');
const cors = import('cors');
const dotenv = import('dotenv');
const OpenAI = import('openai-api');


const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Environment variable for the OpenAI API key
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;


app.post('/api/gpt', async (req, res) => {
  const { exerciseoneprompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is missing from the request.' });
  }
  try {
     
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [{ role: 'assistant', content: exerciseoneprompt }],
        max_tokens: 50,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

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
