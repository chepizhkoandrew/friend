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


app.post("/api/gpt", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const choice = response.data.choices?.[0]?.message?.content;

    if (!choice) {
      throw new Error("Invalid response format from OpenAI API");
    }

    res.json({ text: choice.trim() });
  } catch (error) {
    console.error("Error fetching dog wisdom:", error.message);

    if (error.response) {
      console.error("Error details:", error.response.data);
    }

    res.status(500).json({ error: "Error fetching dog wisdom" });
  }
});

wisdomElement.textContent = wisdomText;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});