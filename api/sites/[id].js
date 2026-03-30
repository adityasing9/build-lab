const { connectDB, Site, handleCors, verifyToken, parseBody } = require('../_lib');

module.exports = async (req, res) => {
  if (handleCors(req, res)) return;

  try {
    await connectDB();

    const { id } = req.query;
    if (!id) return res.status(400).json({ error: 'Missing id' });

    // GET /api/sites/:id/image — public
    if (req.method === 'GET') {
      const site = await Site.findById(id, 'image');
      if (!site) return res.status(404).json({ error: 'Not found' });
      return res.json({ image: site.image || '' });
    }

    // PUT + DELETE — admin only
    try { verifyToken(req); } catch { return res.status(401).json({ error: 'Unauthorized' }); }

    if (req.method === 'PUT') {
      const body = await parseBody(req);
      const { name, url, description, image, order } = body;
      const update = {};
      if (name        !== undefined) update.name        = name;
      if (url         !== undefined) update.url         = url;
      if (description !== undefined) update.description = description;
      if (image       !== undefined) update.image       = image;
      if (order       !== undefined) update.order       = order;

      const site = await Site.findByIdAndUpdate(id, update, { new: true });
      if (!site) return res.status(404).json({ error: 'Not found' });
      const obj = site.toObject();
      delete obj.image;
      return res.json(obj);
    }

    if (req.method === 'DELETE') {
      const site = await Site.findByIdAndDelete(id);
      if (!site) return res.status(404).json({ error: 'Not found' });
      return res.json({ success: true });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Site[id] error:', err);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};
