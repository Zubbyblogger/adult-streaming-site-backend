const express = require('express');
const router = express.Router();
const Video = require('../models/Video');
const fetchPornDrawer = require('../utils/fetchPornDrawer');
const multer = require('multer');

// Upload limit – 300MB max
const upload = multer({ limits: { fileSize: 1024 * 1024 * 300 } });

/**
 * NEW: Root route so GET /api/videos works
 */
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find({ status: 'approved' })
      .sort({ createdAt: -1 })
      .limit(30);
    res.json(videos);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/**
 * GET /api/videos/home
 */
router.get('/home', async (req, res) => {
  try {
    const videos = await Video.find({ status: 'approved' })
      .sort({ createdAt: -1 })
      .limit(30);
    res.json(videos);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/**
 * GET /api/videos/discover
 */
router.get('/discover', async (req, res) => {
  try {
    const items = await Video.find({ status: 'approved' })
      .sort({ createdAt: -1 })
      .limit(60);
    res.json(items);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/**
 * GET /api/videos/porn-drawer
 */
router.get('/porn-drawer', async (req, res) => {
  try {
    const data = await fetchPornDrawer();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/**
 * POST /api/videos/upload
 * Simple upload metadata endpoint
 */
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    const { title, description } = req.body;

    const video = new Video({
      title: title || 'Untitled',
      description: description || '',
      url: '',           // replace with actual storage link (Vicetemple / Bunny)
      thumbnailUrl: '',  // replace with real thumbnail URL
      duration: 0,
      status: 'pending'
    });

    await video.save();
    res.json({ ok: true, id: video._id });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
