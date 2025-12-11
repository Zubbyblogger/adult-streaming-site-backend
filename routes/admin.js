const express = require('express');
const router = express.Router();
const Video = require('../models/Video');

router.get('/pending', async (req,res)=>{
  try{
    const pending = await Video.find({ status: 'pending' }).sort({ createdAt: -1 }).limit(50);
    res.json(pending);
  }catch(e){ res.status(500).json({ error: e.message})}
});

router.post('/approve/:id', async (req,res)=>{
  try{
    const id = req.params.id;
    await Video.findByIdAndUpdate(id, { status: 'approved' });
    res.json({ ok: true });
  }catch(e){ res.status(500).json({ error: e.message})}
});

router.post('/reject/:id', async (req,res)=>{
  try{
    const id = req.params.id;
    await Video.findByIdAndDelete(id);
    res.json({ ok: true });
  }catch(e){ res.status(500).json({ error: e.message})}
});

module.exports = router;
