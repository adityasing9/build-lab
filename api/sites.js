const { connectDB, Site, handleCors, verifyToken, parseBody } = require('./_lib');

module.exports = async (req, res) => {
  if (handleCors(req, res)) return;

  try {
    await connectDB();

    // GET — public
    if (req.method === 'GET') {
      const sites = await Site.find({}, '-image').sort({ order: 1, createdAt: 1 });
      return res.json(sites);
    }

    // POST — admin only
    if (req.method === 'POST') {
      try { verifyToken(req); } catch { return res.status(401).json({ error: 'Unauthorized' }); }

      const body = await parseBody(req);
      const { name, url, description, image } = body;
      if (!name || !url) return res.status(400).json({ error: 'name and url required' });

      const exists = await Site.findOne({ url });
      if (exists) return res.status(409).json({ error: 'URL already exists' });

      const count = await Site.countDocuments();
      const site  = await Site.create({ name, url, description: description || '', image: image || '', order: count });
      const obj   = site.toObject();
      delete obj.image;
      return res.status(201).json(obj);
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Sites error:', err);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};
