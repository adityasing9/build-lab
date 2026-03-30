# GitHub Live Sites Hub — Full Vercel Deploy

One repo, one Vercel project. Frontend (`index.html`) + serverless API (`api/`) on the same domain.

## File Structure

```
github-hub/
├── index.html               ← frontend (served at yourdomain.vercel.app/)
├── api/
│   ├── _lib.js              ← shared DB + auth utilities
│   ├── auth.js              ← POST /api/auth
│   ├── auth/
│   │   └── change-password.js
│   ├── sites.js             ← GET + POST /api/sites
│   └── sites/
│       └── [id].js          ← GET + PUT + DELETE /api/sites/:id
├── vercel.json
├── package.json
└── .env.example
```

## Deploy in 2 Steps

### Step 1 — MongoDB Atlas (free, 5 min)
1. Sign up at cloud.mongodb.com
2. Create free M0 cluster
3. Database Access → Add user (read/write)
4. Network Access → 0.0.0.0/0
5. Connect → Drivers → copy connection string
   - Replace <password>, add db name: ...mongodb.net/githubhub?retryWrites=true&w=majority

### Step 2 — Vercel (free, 3 min)
1. Push this folder to GitHub
2. vercel.com → New Project → import repo
3. Framework: Other (leave build settings blank)
4. Settings → Environment Variables:
   - MONGODB_URI  = your Atlas string
   - JWT_SECRET   = any 32+ char random string
   - ADMIN_PASSWORD = your password
5. Deploy → live at https://your-project.vercel.app

No code changes needed — API_URL is already '' (relative paths).

## Local Dev
```bash
npm install && npm i -g vercel
cp .env.example .env
vercel dev   # runs at http://localhost:3000
```
