const express = require("express");
const router = express.Router();
const Video = require("../models/Video");
const fetchPornDrawer = require("../utils/fetchPornDrawer");
const multer = require("multer");

const upload = multer({ limits: { fileSize: 1024 * 1024 * 300 } }); // 300MB limit for metadata endpoint

// GET /api/videos/  (list recent approved)
router.get("/", async (req, res) => {
  try {
    const videos = await Video.find({ status: "approved" }).sort({ createdAt: -1 }).limit(30);
    res.json(videos);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// GET /api/videos/home
router.get("/home", async (req, res) => {
  try {
    const videos = await Video.find({ status: "approved" }).sort({ createdAt: -1 }).limit(30);
    res.json(videos);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// GET /api/videos/discover
router.get("/discover", async (req, res) => {
  try {
    const items = await Video.find({ status: "approved" }).sort({ createdAt: -1 }).limit(60);
    res.json(items);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// GET /api/videos/porn-drawer  (stub)
router.get("/porn-drawer", async (req, res) => {
  try {
    const data = await fetchPornDrawer();
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// POST /api/videos/upload  (stores metadata only)
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const video = new Video({
      title: title || "Untitled",
      description: description || "",
      url: "", // you should upload the actual file to storage and set this URL
      thumbnailUrl: "",
      duration: 0,
      status: "pending",
      tags: tags ? tags.split(",").map(t => t.trim()).filter(Boolean) : []
    });
    await video.save();
    res.json({ ok: true, id: video._id });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
