// Import necessary modules
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import OpenAI from "openai";

const app = express();

// Define your routes here
app.get('/', (req, res) => {
  res.send('Server is running!');
});


app.get('/health', async (req, res) => {
  try {
    // Check OpenAI API connectivity
    const openaiCheck = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'system', content: 'Health check' }],
      max_tokens: 5,
    });

    res.status(200).json({
      status: 'OK',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      dependencies: {
        openai: 'Connected',
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      dependencies: {
        openai: 'Disconnected',
      },
      error: error.message,
    });
  }
  else if (req.method === 'GET' && req.url === '/client.js') {
    fs.readFile(path.join(__dirname, 'public', 'client.js'), (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Error reading the client.js file.');
        return;
      }

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/javascript');
      res.end(data);
    });
  }

  // Handle POST request to /ask (when user submits a question)
  else if (req.method === 'POST' && req.url === '/ask') {
    let body = '';

    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', async () => {
      const { question } = JSON.parse(body);

      // Make a request to the OpenAI API (or another API)
      try {
        
        const completion = await oaiClient.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                {
                    role: "user",
                    content: question,
                },
            ],
        });
        
        console.log(completion.choices[0].message);

        // Return OpenAI's response
        const answer = completion.choices[0].message.content;
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ answer }));

      } catch (error) {
        console.error('Error calling OpenAI:', error);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Error calling the OpenAI API.' }));
      }
    });
  }

  // Handle other routes (404 Not Found)
  else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }
});

// Start the server
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});