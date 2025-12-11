require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URL;
if (!MONGO_URI) {
  console.warn("MONGO_URI not set in environment. DB calls will fail until set.");
} else {
  mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err && err.message ? err.message : err));
}

// Mount routes
app.use("/api/videos", require("./routes/videos"));

// Basic health endpoint
app.get("/", (req, res) => res.send("Hello from backend"));

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
