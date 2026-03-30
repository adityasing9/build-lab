const { connectDB, Admin, handleCors, verifyToken, bcrypt, parseBody } = require('../_lib');

module.exports = async (req, res) => {
  if (handleCors(req, res)) return;
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try { verifyToken(req); } catch { return res.status(401).json({ error: 'Unauthorized' }); }

  try {
    await connectDB();
    const body = await parseBody(req);
    const { newPassword } = body;
    if (!newPassword || newPassword.length < 6)
      return res.status(400).json({ error: 'Password too short (min 6)' });
    const hash = await bcrypt.hash(newPassword, 12);
    await Admin.updateOne({}, { passwordHash: hash });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};
