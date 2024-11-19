const http = require('http');
const fs = require('fs');
const path = require('path');
const axios = require('axios');  // For making HTTP requests to OpenAI or external APIs
const querystring = require('querystring');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Environment variable for OpenAI API key
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Configure OpenAI API
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Serve the static files from the /public directory
  if (req.method === 'GET' && req.url === '/') {
    fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Error reading the index.html file.');
        return;
      }

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(data);
    });
  }
  else if (req.method === 'GET' && req.url === '/styles.css') {
    fs.readFile(path.join(__dirname, 'public', 'styles.css'), (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Error reading the styles.css file.');
        return;
      }

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/css');
      res.end(data);
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
        const completion = await openai.createChatCompletion({
          model: 'gpt-4',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: question },
          ],
          max_tokens: 50,
        });

        // Return OpenAI's response
        const answer = completion.data.choices[0].message.content;
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
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});