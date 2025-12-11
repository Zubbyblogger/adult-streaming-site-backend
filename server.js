const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const videoRoutes = require('./routes/videos');
const adminRoutes = require('./routes/admin');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/videos', videoRoutes);
app.use('/api/admin', adminRoutes);

const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/streamingdb';
mongoose.connect(MONGO, { useNewUrlParser:true, useUnifiedTopology:true })
  .then(()=> console.log('MongoDB connected'))
  .catch(err=> console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log('Backend running on port', PORT));
