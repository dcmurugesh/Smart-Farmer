# MongoDB Atlas Setup Guide (Cloud Database)

## ✅ Complete Setup in 5 Minutes

### Step 1: Create Free MongoDB Atlas Account (2 minutes)

1. Go to: https://mongodb.com/cloud/atlas
2. Click **"Try Free"** button
3. Sign up with:
   - Email
   - Password
   - Accept terms
4. Click **"Create a Free Account"**

### Step 2: Create Your First Cluster (2 minutes)

1. After signing up, you'll see "Deploy your database"
2. Select **"M0 Sandbox"** (Free tier) - already selected
3. Click **"Create Deployment"**
4. Choose authentication:
   - **Username**: smartfarmer
   - **Password**: Use auto-generated password (copy it!)
5. Click **"Create Database User"**
6. Choose where to host:
   - Select closest region to you
   - Click **"Create Cluster"** (wait ~5-10 minutes)

### Step 3: Get Your Connection String (1 minute)

1. Click **"Connect"** button
2. Choose **"Drivers"** → **"Node.js"**
3. You'll see your connection string like:
   ```
   mongodb+srv://smartfarmer:PASSWORD@cluster0.xxxxx.mongodb.net/smart-farmer?retryWrites=true&w=majority
   ```
4. **Copy this entire string**

### Step 4: Update Your Backend Configuration (1 minute)

1. Open: `Smart Farmer/backend/.env`
2. Replace the MONGODB_URI line with your connection string:
   ```
   MONGODB_URI=mongodb+srv://smartfarmer:PASSWORD@cluster0.xxxxx.mongodb.net/smart-farmer?retryWrites=true&w=majority
   ```
3. **Replace PASSWORD with the password you created**
4. Save the file

### Step 5: Restart Backend Server (1 minute)

In your backend terminal:

```bash
# Press Ctrl+C to stop current server
# Then run:
npm start
```

You should see:
```
Server running on http://localhost:5000
Connected to MongoDB successfully
```

---

## 🔒 Security Tips

- ✅ Keep your password safe (don't share .env file)
- ✅ Use strong password (auto-generated is good)
- ✅ In production, store password in environment variables
- ✅ Don't commit .env to Git (it's in .gitignore)

---

## ✨ What's Included in Free Tier

- ✅ 512 MB Storage (enough for thousands of contacts)
- ✅ Shared cluster
- ✅ Basic monitoring
- ✅ Backups
- ✅ Free forever (no credit card fraud charges)
- ✅ Upgrade anytime if you need more

---

## 🆘 Troubleshooting

### Connection Still Failing?
1. Check your password is correct in .env
2. Make sure you replaced PASSWORD with actual password
3. Wait 5-10 minutes after cluster creation (it needs time to initialize)
4. Try clicking "Reset Password" in Atlas and update .env

### Can't Find Connection String?
1. Go to mongodb.com/cloud/atlas
2. Log in
3. Click your cluster
4. Click "Connect" button
5. Choose "Drivers" → "Node.js"
6. Copy the connection string

### Getting "MongooseServerSelectionError"?
1. Check if cluster is fully created (shows green checkmark)
2. Verify password is correct in .env
3. Check internet connection
4. Restart server: Ctrl+C, then npm start

---

## ✅ Test Connection

Once updated and restarted, test with:

```bash
# In new terminal
curl http://localhost:5000/api/health
```

Should return:
```json
{"status":"API is running"}
```

---

Then test contact form submission:

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test User\",\"message\":\"Test message from MongoDB Atlas\"}"
```

Should return success message with data saved!

---

**That's it! You're all set with MongoDB Atlas!** 🎉
