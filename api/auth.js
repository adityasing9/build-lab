const { connectDB, Admin, ensureAdmin, handleCors, signToken, bcrypt, parseBody } = require('./_lib');

module.exports = async (req, res) => {
  if (handleCors(req, res)) return;
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    await connectDB();
    await ensureAdmin();

    const body = await parseBody(req);
    const { password } = body;

    if (!password) return res.status(400).json({ error: 'Password required' });

    const admin = await Admin.findOne();
    if (!admin) return res.status(500).json({ error: 'Admin not configured' });

    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) return res.status(401).json({ error: 'Wrong password' });

    res.json({ token: signToken() });
  } catch (err) {
    console.error('Auth error:', err);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};
