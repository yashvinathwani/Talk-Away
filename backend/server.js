const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const { chats } = require('./data/data');
const connectDB = require('./config/db');

const app = express();
dotenv.config();
connectDB();

app.get('/', (req, res) => {
  res.send('API is Running');
});

app.get('/api/chat', (req, res) => {
  res.send(chats);
});

app.get('/api/chat/:id', (req, res) => {
  const singleChat = chats.find((chat) => chat._id === req.params.id);
  res.send(singleChat);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running on port ${PORT}`.yellow.bold));
