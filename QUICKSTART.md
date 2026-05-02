# Smart Farmer Portal - Quick Start Guide

Get up and running in 5 minutes!

## ⚡ Quick Setup

### 1. Install Dependencies (Backend)
```bash
cd "Smart Farmer/backend"
npm install
```

### 2. Start MongoDB
Choose one option:

**Option A - Local MongoDB**:
```bash
# Windows
mongod

# macOS (if installed via Homebrew)
brew services start mongodb-community
```

**Option B - MongoDB Atlas (Cloud)**:
- Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Create a cluster
- Get connection string and paste in `backend/.env`

### 3. Start Backend Server
```bash
cd backend
npm start
```

You should see:
```
Server running on http://localhost:5000
Connected to MongoDB successfully
```

### 4. Open Frontend
```bash
# Option A: Direct (simple)
# Navigate to: Smart Farmer/frontend/index.html
# Double-click the file

# Option B: Live Server (better)
cd frontend
npx live-server --port=3000
```

### 5. Test in Browser
Visit: `http://localhost:3000`

## ✅ Verify It Works

- [ ] Navbar shows 4 sections (Home, Crops, Tips, Contact)
- [ ] Click "Crops" → Click a crop card → Modal appears with details
- [ ] Click "Tips" → View all farming tips
- [ ] Click "Contact" → Fill form and submit
- [ ] Check console (F12) for "Connected to backend" message

## 📝 Quick API Test

Test your backend with curl:

```bash
# Health check
curl http://localhost:5000/api/health

# Submit a message
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","message":"Test message"}'

# Get all contacts
curl http://localhost:5000/api/contacts
```

## 🔗 MongoDB Atlas Setup (Quick Reference)

1. Create account at mongodb.com/cloud/atlas
2. Create cluster (free tier available)
3. Create database user (name/password)
4. Click "Connect" → "Drivers" → Copy connection string
5. In `backend/.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smart-farmer?retryWrites=true&w=majority
   ```
6. Restart backend: `npm start`

## 🚨 Troubleshooting

| Issue | Solution |
|-------|----------|
| Backend won't start | Check MongoDB is running |
| Cannot connect to API | Ensure backend is on port 5000 |
| Form not submitting | Open F12 console, check for errors |
| Styling looks off | Clear browser cache (Ctrl+Shift+Delete) |
| MongoDB connection fails | Check connection string in `.env` |

## 📱 Features Overview

| Section | What You Can Do |
|---------|-----------------|
| **Home** | View app overview and features |
| **Crops** | Click crops to see climate, water, season info |
| **Tips** | Read weather, fertilizer, seasonal, water tips |
| **Contact** | Submit name & message (saved to MongoDB) |

## 🎯 Project Files

```
Smart Farmer/
├── frontend/
│   ├── index.html      ← Open in browser
│   ├── styles.css      ← Green theme (modify to customize)
│   └── script.js       ← Modify API_BASE_URL here
├── backend/
│   ├── server.js       ← Express server
│   ├── package.json    ← Dependencies
│   └── .env            ← Configuration
└── README.md           ← Full documentation
```

## 🚀 Next Steps

1. **Customize**:
   - Change colors in `styles.css`
   - Add more crops in `script.js`
   - Modify tips in `index.html`

2. **Deploy**:
   - Backend: Use Heroku or Railway
   - Frontend: Use Netlify, Vercel, or GitHub Pages
   - See full README.md for detailed deployment steps

3. **Enhance**:
   - Add email notifications
   - Integrate weather API
   - Add user authentication
   - Create admin dashboard

## 💡 Tips

- Backend and frontend can run on different machines
- Update `API_BASE_URL` in `script.js` when deploying
- MongoDB Atlas has free tier (perfect for learning)
- Keep `.env` file secret (don't commit to git)

---

Need help? See full README.md for detailed documentation!
