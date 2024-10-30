const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Import routes
const songRoutes = require('./music-api/routes/songRoutes.js');
const playlistRoutes = require('/routes/playlistRoutes');

// Use routes
app.use('/api', songRoutes);
app.use('/api', playlistRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Database connection error:', err));

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
