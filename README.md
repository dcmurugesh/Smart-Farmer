# Smart Farmer Information Portal

A comprehensive full-stack web application providing farmers with detailed information about crops, climate requirements, fertilizer tips, and weather guidance.

## 🌾 Features

- **Crop Information**: Detailed information about Rice, Wheat, Cotton, and Maize
  - Climate requirements
  - Water needs
  - Growing seasons
  - Additional cultivation tips

- **Farming Tips & Best Practices**
  - Weather-based seasonal tips
  - Organic fertilizer recommendations
  - Seasonal crop suggestions
  - Water management strategies

- **Contact Form**
  - Submit questions and messages
  - Data stored in MongoDB
  - Backend API integration

- **Responsive Design**
  - Green theme with clean, modern UI
  - Mobile-friendly layout
  - Smooth navigation and interactions

## 🏗️ Project Structure

```
Smart Farmer/
├── frontend/
│   ├── index.html          # Main HTML page
│   ├── styles.css          # CSS styling with green theme
│   └── script.js           # JavaScript functionality
├── backend/
│   ├── server.js           # Express server and API routes
│   ├── package.json        # Node.js dependencies
│   └── .env                # Environment variables
└── README.md               # This file
```

## 🛠️ Technology Stack

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Responsive design with green theme
- **JavaScript**: DOM manipulation and API communication
- **No frameworks**: Pure vanilla JavaScript for simplicity

### Backend
- **Node.js**: JavaScript runtime
- **Express**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **CORS**: Cross-Origin Resource Sharing
- **Body Parser**: Request body parsing

## 📋 Prerequisites

Before you begin, ensure you have installed:

1. **Node.js** (v14 or higher)
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version` and `npm --version`

2. **MongoDB** (Local or Cloud)
   - **Option A - Local MongoDB**:
     - Download from [mongodb.com/try/download](https://www.mongodb.com/try/download/community)
     - Install and run MongoDB service
   - **Option B - MongoDB Atlas (Cloud)**:
     - Create free account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
     - Create a cluster and get connection string

3. **Code Editor**
   - Visual Studio Code recommended
   - Download from [code.visualstudio.com](https://code.visualstudio.com/)

4. **Git** (Optional, for version control)
   - Download from [git-scm.com](https://git-scm.com/)

## 🚀 Installation & Setup

### Step 1: Setup Backend

1. Navigate to the backend directory:
   ```bash
   cd "Smart Farmer/backend"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure MongoDB connection:
   - Open `.env` file
   - Update `MONGODB_URI`:
     - **For Local MongoDB**: `mongodb://localhost:27017/smart-farmer`
     - **For MongoDB Atlas**: 
       ```
       MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smart-farmer?retryWrites=true&w=majority
       ```

4. Start the backend server:
   ```bash
   npm start
   ```

   You should see:
   ```
   Server running on http://localhost:5000
   Connected to MongoDB successfully
   ```

### Step 2: Setup Frontend

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Open `index.html` in your web browser:
   - **Option A - Direct**: Double-click `index.html`
   - **Option B - HTTP Server** (Recommended for better CORS handling):
     ```bash
     # If you have Python installed
     python -m http.server 3000
     # or
     python -m SimpleHTTPServer 3000
     
     # If you have Node.js live-server
     npx live-server --port=3000
     ```

3. Open browser and navigate to:
   - Direct: `file:///path/to/Smart%20Farmer/frontend/index.html`
   - HTTP Server: `http://localhost:3000`

## 📱 How to Use

### Navigation
- Use the navbar to navigate between sections: Home, Crops, Tips, and Contact

### Explore Crops
1. Click on "Crops" in the navbar
2. Click on any crop card (Rice, Wheat, Cotton, Maize)
3. A modal popup shows detailed information:
   - Climate requirements
   - Water needs
   - Growing season
   - Additional cultivation tips

### View Farming Tips
1. Click on "Tips" in the navbar
2. Browse different tip categories:
   - Weather Tips: Season-based farming advice
   - Organic Fertilizer Tips: Natural fertilization methods
   - Seasonal Suggestions: Crop recommendations by season
   - Water Management: Irrigation and conservation tips

### Submit Contact Form
1. Click on "Contact" in the navbar
2. Fill in your name and message
3. Click "Send Message"
4. Your data is sent to the backend and stored in MongoDB
5. Receive confirmation message

## 🔌 API Documentation

### Health Check
```
GET /api/health
Response: { status: "API is running" }
```

### Submit Contact Form
```
POST /api/contact
Content-Type: application/json

Request Body:
{
  "name": "John Doe",
  "message": "I have a question about rice cultivation."
}

Success Response (201):
{
  "success": true,
  "message": "Thank you! Your message has been saved. We will contact you soon.",
  "data": {
    "_id": "...",
    "name": "John Doe",
    "message": "I have a question about rice cultivation.",
    "createdAt": "2026-05-02T10:30:00.000Z"
  }
}

Error Response (400/500):
{
  "success": false,
  "message": "Error message",
  "error": "..."
}
```

### Get All Contacts (Admin)
```
GET /api/contacts
Response:
{
  "success": true,
  "count": 5,
  "data": [...]
}
```

## 🗄️ MongoDB Database Schema

### Contact Collection
```javascript
{
  _id: ObjectId,
  name: String (required),
  message: String (required),
  createdAt: Date (default: now)
}
```

Example document:
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Raj Kumar",
  "message": "How much fertilizer should I use for wheat?",
  "createdAt": "2026-05-02T10:30:00.000Z"
}
```

## 🌐 Deployment Guide

### Deploy Backend (Heroku Example)

1. **Prepare for Deployment**:
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Create Heroku App**:
   ```bash
   heroku create your-app-name
   ```

3. **Set Environment Variables**:
   ```bash
   heroku config:set MONGODB_URI="your_mongodb_atlas_uri"
   heroku config:set PORT=5000
   ```

4. **Deploy**:
   ```bash
   git push heroku main
   heroku logs --tail
   ```

5. **Verify**: Visit `https://your-app-name.herokuapp.com/api/health`

### Deploy Frontend (Netlify/Vercel Example)

#### Using Netlify:
1. Commit your code to GitHub
2. Connect GitHub repo to [Netlify](https://netlify.com)
3. Set build command (if needed): `npm run build`
4. Deploy branch: `main`
5. Update API_BASE_URL in `script.js` to your backend URL

#### Using Vercel:
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel` in frontend directory
3. Follow prompts
4. Update API_BASE_URL in `script.js`

#### Using GitHub Pages:
1. Push code to GitHub repository
2. Go to Settings → Pages
3. Select `main` branch as source
4. Your site will be available at `username.github.io/repo-name`

### Update API Base URL for Production

In `frontend/script.js`, change:
```javascript
// Development
const API_BASE_URL = 'http://localhost:5000';

// Production
const API_BASE_URL = 'https://your-backend-url.herokuapp.com';
```

## 🔧 Development Tips

### Useful npm Scripts

**Backend**:
```bash
npm start          # Start server in production
npm run dev        # Start with nodemon (auto-reload)
```

**Frontend**:
```bash
# Use live-server for development with hot reload
npx live-server --port=3000
```

### Common Issues & Solutions

**Issue**: "Cannot find module 'express'"
- **Solution**: Run `npm install` in backend directory

**Issue**: "MongoDB connection failed"
- **Solution**: 
  - Check if MongoDB is running (`mongod`)
  - Verify connection string in `.env`
  - Check firewall settings

**Issue**: "CORS error in browser console"
- **Solution**:
  - Ensure backend is running
  - Check API_BASE_URL in script.js matches backend URL
  - Verify CORS is enabled in server.js

**Issue**: "Form submission not working"
- **Solution**:
  - Open browser console (F12) to check for errors
  - Verify backend API is running
  - Check network tab to see API response

### Testing Locally

1. **Start Backend**:
   ```bash
   cd backend
   npm start
   ```

2. **Start Frontend** (in new terminal):
   ```bash
   cd frontend
   npx live-server --port=3000
   ```

3. **Test Features**:
   - Navigate through all sections
   - Click on crops to view details
   - Submit a test message via contact form
   - Check MongoDB for saved contact data

## 📦 Project Structure Details

### Backend Files

**server.js**:
- Express server setup
- MongoDB connection
- API routes (/api/contact, /api/contacts, /api/health)
- Error handling middleware

**package.json**:
- Project metadata
- Dependencies and versions
- npm scripts

**.env**:
- MongoDB connection string
- Server port
- Environment-specific variables

### Frontend Files

**index.html**:
- Semantic HTML structure
- Navigation bar
- Home, Crops, Tips, Contact sections
- Modal for crop details
- Contact form

**styles.css**:
- Green theme with CSS variables
- Responsive grid layouts
- Animations and transitions
- Mobile breakpoints (768px, 480px)

**script.js**:
- Section navigation logic
- Crop data management
- Modal functionality
- Contact form validation and submission
- API communication
- Backend health check

## 🎨 Customization Guide

### Change Theme Colors

In `frontend/styles.css`, modify CSS variables:
```css
:root {
    --primary-green: #27ae60;      /* Main green */
    --light-green: #2ecc71;        /* Light green */
    --dark-green: #1e8449;         /* Dark green */
    --very-light-green: #d5f4e6;   /* Very light green */
    --light-bg: #f0f9f4;           /* Light background */
}
```

### Add More Crops

In `frontend/script.js`, update `cropsData` object:
```javascript
cropsData.sugarcane = {
    name: '🥒 Sugarcane',
    climate: '...',
    waterNeeds: '...',
    season: '...',
    details: [...]
};
```

And add a card to `index.html` crops section:
```html
<div class="crop-card" onclick="showCropDetails('sugarcane')">
    <h3>🥒 Sugarcane</h3>
    <p>Click to learn more</p>
</div>
```

### Add More Tips

In `index.html`, add new tip-card divs in the tips section:
```html
<div class="tip-card">
    <h3>🌿 Pest Management</h3>
    <ul>
        <li><strong>Natural Pesticides:</strong> Neem oil and garlic spray</li>
        <!-- More tips -->
    </ul>
</div>
```

## 📚 Learning Resources

- **Node.js**: [nodejs.org/docs](https://nodejs.org/docs/)
- **Express**: [expressjs.com](https://expressjs.com/)
- **MongoDB**: [docs.mongodb.com](https://docs.mongodb.com/)
- **JavaScript**: [developer.mozilla.org/js](https://developer.mozilla.org/en-US/docs/Web/JavaScript/)
- **CSS**: [developer.mozilla.org/css](https://developer.mozilla.org/en-US/docs/Web/CSS/)

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Support

If you encounter any issues:
1. Check the console for error messages (F12 in browser)
2. Verify all services are running (Node.js, MongoDB)
3. Check file paths and URLs
4. Review the "Common Issues & Solutions" section above

## 🌱 Future Enhancements

Potential features to add:
- User authentication and login
- Advanced crop search and filtering
- Weather API integration for real-time data
- Video tutorials for farming techniques
- Image gallery for crops
- User dashboard to track submitted contacts
- Admin panel for managing content
- Email notifications for contact submissions
- Mobile app version

---

**Built with ❤️ for farmers and agricultural enthusiasts**

Last Updated: May 2, 2026
