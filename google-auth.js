const express = require('express');
const { OAuth2Client } = require('google-auth-library');
require('dotenv').config();

const app = express();
const googleClient = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "https://yourdomain.com/oauth2callback" // This should match your authorized redirect URI in Google Console
);

app.get('/auth/google', (req, res) => {
    const authorizeUrl = googleClient.generateAuthUrl({
        access_type: 'offline',
        scope: ['profile', 'email'],
    });
    res.redirect(authorizeUrl);
});

app.get('/oauth2callback', async (req, res) => {
    const { code } = req.query;
    const { tokens } = await googleClient.getToken(code); // Exchange code for tokens
    googleClient.setCredentials(tokens);

    // Optionally use tokens to fetch user info
    const ticket = await googleClient.verifyIdToken({
        idToken: tokens.id_token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    console.log(payload); // Contains user information

    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});