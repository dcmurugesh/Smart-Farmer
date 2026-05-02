# Smart Farmer Portal - Deployment Guide (Render + Netlify)

## ⚠️ Prerequisites (Must Complete First)

### 1. MongoDB Atlas Setup
If you haven't done this yet, you MUST do it first:
- Go to https://mongodb.com/cloud/atlas
- Create free account and cluster
- Get connection string
- Update `backend/.env` with your connection string

**[Follow MONGODB_ATLAS_SETUP.md for detailed steps]**

### 2. GitHub Account
- Sign up: https://github.com/signup
- Create new repository called "smart-farmer-portal"

---

## 📋 Deployment Steps

### STEP 1: Push Code to GitHub (5 minutes)

In your project root directory (`Smart Farmer/`):

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Smart Farmer Portal"

# Add remote (replace USERNAME with your GitHub username)
git remote add origin https://github.com/USERNAME/smart-farmer-portal.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Verify**: Visit https://github.com/YOUR_USERNAME/smart-farmer-portal

---

### STEP 2: Deploy Backend to Render (10 minutes)

#### 2a: Create Render Account
1. Go to: https://render.com
2. Click **"Sign up"**
3. Use your GitHub account to sign up (easier)
4. Authorize access

#### 2b: Create New Web Service
1. Click **"New +"** → **"Web Service"**
2. Click **"Connect a repository"**
3. Find your **"smart-farmer-portal"** repo
4. Click **"Connect"**

#### 2c: Configure Backend Service
Fill in the form:

| Setting | Value |
|---------|-------|
| **Name** | smart-farmer-backend |
| **Root Directory** | backend |
| **Runtime** | Node |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Plan** | Free |

#### 2d: Set Environment Variables
1. Scroll down to **"Environment"**
2. Add new variable:
   - **Key**: `MONGODB_URI`
   - **Value**: `[Paste your MongoDB Atlas connection string]`
3. Add another variable:
   - **Key**: `NODE_ENV`
   - **Value**: `production`

#### 2e: Deploy
1. Click **"Create Web Service"**
2. Wait 5-10 minutes for deployment
3. You'll get a URL like: `https://smart-farmer-backend.onrender.com`
4. **Copy this URL** (you'll need it later)

**Test your backend**:
```bash
curl https://smart-farmer-backend.onrender.com/api/health
# Should return: {"status":"API is running"}
```

---

### STEP 3: Update Frontend API URL (2 minutes)

Now update your frontend to use the deployed backend:

1. Open: `frontend/script.js`
2. Find line with `API_BASE_URL` (around line 1):
   ```javascript
   const API_BASE_URL = 'http://localhost:5000';
   ```
3. Replace with your Render URL:
   ```javascript
   const API_BASE_URL = 'https://smart-farmer-backend.onrender.com';
   ```
4. Save file
5. Commit and push to GitHub:
   ```bash
   git add frontend/script.js
   git commit -m "Update API URL for production"
   git push
   ```

---

### STEP 4: Deploy Frontend to Netlify (10 minutes)

#### 4a: Connect GitHub to Netlify
1. Go to: https://netlify.com
2. Click **"Sign up"**
3. Choose **"Sign up with GitHub"**
4. Authorize Netlify to access your repositories

#### 4b: Create New Site
1. Click **"Add new site"** → **"Import an existing project"**
2. Choose **"GitHub"**
3. Find and select **"smart-farmer-portal"**

#### 4c: Configure Build Settings
1. **Base directory**: `frontend`
2. **Build command**: (leave empty - static files)
3. **Publish directory**: `frontend`

#### 4d: Deploy
1. Click **"Deploy site"**
2. Wait 1-2 minutes
3. You'll get a URL like: `https://smart-farmer-portal.netlify.app`

**Test your frontend**:
- Visit: `https://smart-farmer-portal.netlify.app`
- Click on "Crops" → click a crop card → should see modal
- Click on "Contact" → fill form → submit → should see success message
- Data should be saved in MongoDB!

---

## ✅ Verify Everything Works

### Backend Tests

```bash
# Health check
curl https://smart-farmer-backend.onrender.com/api/health

# Submit a contact
curl -X POST https://smart-farmer-backend.onrender.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","message":"Test message from deployment"}'

# Get all contacts
curl https://smart-farmer-backend.onrender.com/api/contacts
```

### Frontend Tests

1. Visit your Netlify URL
2. Test all features:
   - [ ] Navbar links work
   - [ ] Crops modal opens
   - [ ] Tips display correctly
   - [ ] Contact form submits
   - [ ] Success message appears
   - [ ] Data appears in MongoDB

---

## 🎉 Your Live URLs

Once deployed, share these:

- **Frontend**: `https://smart-farmer-portal.netlify.app`
- **Backend API**: `https://smart-farmer-backend.onrender.com`

---

## 📝 Environment Variables Reference

### Backend (Render)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smart-farmer?retryWrites=true&w=majority
NODE_ENV=production
PORT=5000 (auto-set by Render)
```

### Frontend (Netlify)
No environment variables needed - update in source code before deployment.

---

## 🔄 Making Changes After Deployment

### Backend Changes
1. Edit code locally
2. Commit and push: `git push`
3. Render automatically redeploys (takes 5-10 min)

### Frontend Changes
1. Edit code locally (including API URL if needed)
2. Commit and push: `git push`
3. Netlify automatically redeploys (takes 1-2 min)

---

## ⚠️ Troubleshooting

### Backend Won't Deploy
- **Problem**: "Build failed"
  - **Solution**: Check backend/.env exists and has valid MONGODB_URI
  
- **Problem**: "MongooseServerSelectionError"
  - **Solution**: Verify MONGODB_URI in Render environment variables is correct

- **Problem**: "Command failed: npm start"
  - **Solution**: Check server.js syntax, run `npm start` locally first

### Frontend Won't Load
- **Problem**: "Blank page"
  - **Solution**: Check frontend/index.html exists, check browser console for errors

- **Problem**: "API_BASE_URL 404 errors"
  - **Solution**: Verify API_BASE_URL in script.js matches your Render backend URL

- **Problem**: "CORS error in console"
  - **Solution**: Make sure backend has CORS enabled (it does by default)

### Form Submission Fails
- **Problem**: "Error sending message"
  - **Solution**: 
    1. Check backend is running on Render
    2. Verify API_BASE_URL in script.js is correct
    3. Check MongoDB connection string in Render environment

---

## 💰 Costs

### Render (Backend)
- **Free tier**: Included, Auto-sleep after 15 min of inactivity
- **Paid tier**: $7/month to prevent auto-sleep (optional)

### Netlify (Frontend)
- **Free tier**: Forever free for static sites
- **Paid tier**: Optional premium features

### MongoDB Atlas
- **Free tier**: 512MB storage, forever free
- **Paid tiers**: Start at $57/month

**Total Cost**: $0-7/month (free to basic deployment)

---

## 📚 Git Commands Cheat Sheet

```bash
# First time setup
git init
git add .
git commit -m "message"
git remote add origin https://github.com/USERNAME/repo.git
git push -u origin main

# After making changes
git add .
git commit -m "description of changes"
git push

# Check status
git status

# View commit history
git log --oneline
```

---

## 🚀 Next Steps

1. **Setup MongoDB Atlas** (if not done)
   - Follow MONGODB_ATLAS_SETUP.md

2. **Push to GitHub**
   - Run git commands above

3. **Deploy Backend to Render**
   - Follow STEP 2

4. **Update API URL**
   - Follow STEP 3

5. **Deploy Frontend to Netlify**
   - Follow STEP 4

6. **Test Everything**
   - Follow "Verify Everything Works"

---

## 📞 Support

### Common Issues
- Check Render and Netlify deployment logs
- Verify environment variables are set correctly
- Test API with curl before frontend deployment
- Check MongoDB Atlas cluster is accessible

### Helpful Resources
- Render Docs: https://render.com/docs
- Netlify Docs: https://docs.netlify.com
- MongoDB Docs: https://docs.mongodb.com
- Git Docs: https://git-scm.com/doc

---

**🎉 Congratulations! Your app will be live on the internet!**

Questions? Check the troubleshooting section or review the step-by-step instructions.

---

**Deployment Platforms Used**:
- Backend: Render (Node.js hosting)
- Frontend: Netlify (Static site hosting)
- Database: MongoDB Atlas (Cloud database)

**Total Setup Time**: ~30 minutes
**Cost**: Free or $7/month (optional)
