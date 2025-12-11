const axios = require('axios');
const cheerio = require('cheerio');

async function fetchPornDrawer(){
  try{
    const url = 'https://www.pornhd.com/';
    const { data } = await axios.get(url, { timeout: 10000 });
    const $ = cheerio.load(data);
    const out = [];
    // selectors may change; this is a best-effort and may need adjustment
    $('.thumb-wrap, .video-item, .thumb-video').each((i, el) => {
      if(i >= 60) return;
      const a = $(el).find('a').first();
      const link = a.attr('href') ? a.attr('href') : '';
      const title = a.attr('title') || $(el).find('img').attr('alt') || 'Video';
      const img = $(el).find('img').attr('src') || $(el).find('img').attr('data-src') || '';
      out.push({ title: title.trim(), link: link.startsWith('http') ? link : ('https://www.pornhd.com' + link), thumbnailUrl: img });
    });
    return out.slice(0, 40);
  }catch(e){
    console.error('Porn drawer fetch error', e.message);
    return [];
  }
}

module.exports = fetchPornDrawer;
