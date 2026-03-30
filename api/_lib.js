const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');
const jwt      = require('jsonwebtoken');

// ── Mongoose connection (cached across warm invocations) ─────────────────────
let cached = global._mongoConn;
if (!cached) { cached = global._mongoConn = { conn: null, promise: null }; }

async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI, { bufferCommands: false });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// ── Models ───────────────────────────────────────────────────────────────────
const SiteSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  url:         { type: String, required: true, unique: true },
  description: { type: String, default: '' },
  image:       { type: String, default: '' },
  order:       { type: Number, default: 0 },
  createdAt:   { type: Date,   default: Date.now }
});
const AdminSchema = new mongoose.Schema({
  passwordHash: { type: String, required: true }
});

const Site  = mongoose.models.Site  || mongoose.model('Site',  SiteSchema);
const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

// ── Seed admin password on first run ─────────────────────────────────────────
async function ensureAdmin() {
  const exists = await Admin.findOne();
  if (!exists) {
    const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
    await Admin.create({ passwordHash: hash });
    console.log('Admin seeded');
  }
}

// ── Body parser — Vercel doesn't always auto-parse JSON ──────────────────────
async function parseBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  return new Promise((resolve) => {
    let data = '';
    req.on('data', chunk => { data += chunk.toString(); });
    req.on('end', () => { try { resolve(JSON.parse(data)); } catch { resolve({}); } });
    req.on('error', () => resolve({}));
  });
}

// ── CORS ─────────────────────────────────────────────────────────────────────
function handleCors(req, res) {
  const origin = req.headers.origin || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') { res.status(200).end(); return true; }
  return false;
}

// ── JWT ──────────────────────────────────────────────────────────────────────
function signToken() {
  return jwt.sign({ admin: true }, process.env.JWT_SECRET, { expiresIn: '7d' });
}
function verifyToken(req) {
  const header = req.headers.authorization || '';
  if (!header.startsWith('Bearer ')) throw new Error('No token');
  return jwt.verify(header.slice(7), process.env.JWT_SECRET);
}

module.exports = { connectDB, Site, Admin, ensureAdmin, handleCors, signToken, verifyToken, bcrypt, parseBody };
