const { connectDB, handleCors } = require('./_lib');

module.exports = async (req, res) => {
  if (handleCors(req, res)) return;

  const checks = {
    api: 'ok',
    MONGODB_URI:     process.env.MONGODB_URI     ? 'set' : 'MISSING',
    JWT_SECRET:      process.env.JWT_SECRET      ? 'set' : 'MISSING',
    ADMIN_PASSWORD:  process.env.ADMIN_PASSWORD  ? 'set' : 'MISSING',
    db: 'untested'
  };

  try {
    await connectDB();
    checks.db = 'connected';
  } catch (err) {
    checks.db = 'error: ' + err.message;
  }

  const allOk = Object.values(checks).every(v => v === 'ok' || v === 'set' || v === 'connected');
  res.status(allOk ? 200 : 500).json(checks);
};
