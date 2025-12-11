const express = require('express');
const router = express.Router();
const Video = require('../models/Video');
const fetchPornDrawer = require('../utils/fetchPornDrawer');

// Simple endpoints
router.get('/home', async (req, res) => {
  try{
    const videos = await Video.find({ status: 'approved' }).sort({ createdAt: -1 }).limit(30);
    res.json(videos);
  }catch(e){ res.status(500).json({ error: e.message }) }
});

router.get('/discover', async (req,res)=>{
  try{
    const items = await Video.find({ status: 'approved' }).sort({ createdAt: -1 }).limit(60);
    res.json(items);
  }catch(e){ res.status(500).json({ error: e.message }) }
});

router.get('/porn-drawer', async (req,res)=>{
  try{
    const data = await fetchPornDrawer();
    res.json(data);
  }catch(e){ res.status(500).json({ error: e.message }) }
});

// Basic upload endpoint (stores metadata only; for file uploads, integrate your storage)
const multer = require('multer');
const upload = multer({ limits: { fileSize: 1024 * 1024 * 300 } }); // 300MB max

router.post('/upload', upload.single('file'), async (req,res)=>{
  try{
    const file = req.file;
    const { title, description } = req.body;
    // In this scaffold we don't store file binary - you should upload file to storage (Vicetemple) and save URL.
    const video = new Video({
      title: title || 'Untitled',
      description: description || '',
      url: '', // replace with actual storage URL after upload
      thumbnailUrl: '', // replace with generated thumbnail URL
      duration: 0,
      status: 'pending'
    });
    await video.save();
    res.json({ ok: true, id: video._id });
  }catch(e){ res.status(500).json({ error: e.message }) }
});

module.exports = router;
