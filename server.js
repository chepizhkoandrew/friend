// Import necessary modules
const express = import('express');
const axios = import('axios');
const cors = import('cors');
const dotenv = import('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Environment variable for the OpenAI API key
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post('/get-joke', async (req, res) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [{ role: 'assistant', content: 'Tell me a short joke for not more than 1 sentence.' }],
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
