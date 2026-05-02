# API Documentation - Smart Farmer Information Portal

## Base URL

**Development**: `http://localhost:5000`
**Production**: `https://your-deployed-backend.com`

## Endpoints

### 1. Health Check

Check if the API is running and available.

**Endpoint**: `GET /api/health`

**Request**:
```bash
curl http://localhost:5000/api/health
```

**Response** (200 OK):
```json
{
  "status": "API is running"
}
```

---

### 2. Submit Contact Form

Save a contact message to the database.

**Endpoint**: `POST /api/contact`

**Headers**:
```
Content-Type: application/json
```

**Request Body**:
```json
{
  "name": "John Farmer",
  "message": "What is the best time to plant wheat?"
}
```

**Request Example**:
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Farmer",
    "message": "What is the best time to plant wheat?"
  }'
```

**Success Response** (201 Created):
```json
{
  "success": true,
  "message": "Thank you! Your message has been saved. We will contact you soon.",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Farmer",
    "message": "What is the best time to plant wheat?",
    "createdAt": "2026-05-02T10:30:00.000Z"
  }
}
```

**Error Response** (400 Bad Request):
```json
{
  "success": false,
  "message": "Name and message are required"
}
```

**Error Response** (500 Server Error):
```json
{
  "success": false,
  "message": "Error saving contact information",
  "error": "Database connection failed"
}
```

**Validation Rules**:
- `name`: Required, string, minimum 2 characters
- `message`: Required, string, minimum 10 characters

---

### 3. Get All Contacts

Retrieve all submitted contact messages (for admin purposes).

**Endpoint**: `GET /api/contacts`

**Request**:
```bash
curl http://localhost:5000/api/contacts
```

**Response** (200 OK):
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Farmer",
      "message": "What is the best time to plant wheat?",
      "createdAt": "2026-05-02T10:30:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Sarah Agricultural",
      "message": "How much water does rice need?",
      "createdAt": "2026-05-02T09:15:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439013",
      "name": "Ram Singh",
      "message": "Best fertilizer for cotton?",
      "createdAt": "2026-05-02T08:45:00.000Z"
    }
  ]
}
```

**Error Response** (500 Server Error):
```json
{
  "success": false,
  "message": "Error fetching contacts",
  "error": "Database connection failed"
}
```

**Notes**:
- Returns contacts sorted by creation date (newest first)
- This endpoint should be protected with authentication in production

---

## HTTP Status Codes

| Code | Meaning | Use Case |
|------|---------|----------|
| 200 | OK | Successful GET request |
| 201 | Created | Successful POST request (resource created) |
| 400 | Bad Request | Invalid input data |
| 404 | Not Found | Endpoint doesn't exist |
| 500 | Server Error | Database or server error |

---

## Error Handling

All error responses follow this format:

```json
{
  "success": false,
  "message": "User-friendly error message",
  "error": "Technical error details (in development)"
}
```

**Common Errors**:
1. **Missing Fields**: Return 400 with "Name and message are required"
2. **Database Error**: Return 500 with specific error message
3. **Invalid Route**: Return 404 with "Route not found"

---

## Frontend Integration Example

### JavaScript Fetch API

```javascript
// Submit contact form
async function submitContact(name, message) {
  try {
    const response = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        message: message
      })
    });

    const data = await response.json();

    if (response.ok && data.success) {
      console.log('Success:', data.message);
      // Clear form, show success message
    } else {
      console.error('Error:', data.message);
      // Show error message
    }
  } catch (error) {
    console.error('Network error:', error);
    // Show connection error
  }
}
```

### jQuery AJAX

```javascript
$.ajax({
  type: 'POST',
  url: 'http://localhost:5000/api/contact',
  contentType: 'application/json',
  data: JSON.stringify({
    name: 'John Farmer',
    message: 'Question about wheat cultivation'
  }),
  success: function(data) {
    if (data.success) {
      console.log('Message saved successfully');
    }
  },
  error: function(xhr, status, error) {
    console.error('Error:', error);
  }
});
```

---

## CORS Policy

The API accepts requests from any origin (`*`). For production, update in `server.js`:

```javascript
app.use(cors({
  origin: 'https://yourdomain.com',
  credentials: true
}));
```

---

## Rate Limiting (Recommended for Production)

Add rate limiting to prevent abuse:

```javascript
const rateLimit = require('express-rate-limit');

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5 // limit each IP to 5 requests per windowMs
});

app.post('/api/contact', contactLimiter, async (req, res) => {
  // ... your code
});
```

---

## Authentication (Recommended for Production)

Protect admin endpoints with JWT:

```javascript
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }
  
  jwt.verify(token, 'secret_key', (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    req.userId = decoded.id;
    next();
  });
}

app.get('/api/contacts', verifyToken, async (req, res) => {
  // ... your code
});
```

---

## Testing with Postman

1. **Import Collection**:
   - Create new collection "Smart Farmer API"

2. **Add Requests**:

   **Health Check**:
   - Method: GET
   - URL: `http://localhost:5000/api/health`

   **Submit Contact**:
   - Method: POST
   - URL: `http://localhost:5000/api/contact`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
     ```json
     {
       "name": "Test User",
       "message": "This is a test message for the API"
     }
     ```

   **Get Contacts**:
   - Method: GET
   - URL: `http://localhost:5000/api/contacts`

---

## Deployment Notes

When deploying:

1. **Update API_BASE_URL** in `frontend/script.js`:
   ```javascript
   const API_BASE_URL = 'https://your-backend-url.com';
   ```

2. **Update CORS settings** in `backend/server.js` for your domain

3. **Set environment variables** on your hosting platform:
   - `MONGODB_URI`: Your MongoDB connection string
   - `PORT`: Server port (usually set by hosting platform)
   - `NODE_ENV`: Set to "production"

4. **Enable HTTPS** for secure data transmission

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| CORS error | Update CORS origin in server.js |
| Connection timeout | Check backend is running on port 5000 |
| MongoDB error | Verify connection string in .env |
| 404 error | Check endpoint URL spelling |
| Empty response | Ensure Content-Type is application/json |

---

**Last Updated**: May 2, 2026
**Version**: 1.0.0
