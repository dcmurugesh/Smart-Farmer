const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/smart-farmer';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB successfully');
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Define Contact Schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create Contact Model
const Contact = mongoose.model('Contact', contactSchema);

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'API is running' });
});

// POST endpoint to save contact form data
app.post('/api/contact', async (req, res) => {
  try {
    const { name, message } = req.body;

    // Validation
    if (!name || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name and message are required',
      });
    }

    // Create new contact
    const newContact = new Contact({
      name,
      message,
    });

    // Save to database
    await newContact.save();

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been saved. We will contact you soon.',
      data: newContact,
    });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving contact information',
      error: error.message,
    });
  }
});

// GET all contacts (for admin purposes)
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts',
      error: error.message,
    });
  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
