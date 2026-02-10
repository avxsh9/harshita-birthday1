const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware (Allow all origins for debugging)
app.use(cors());
app.use(express.json());

app.use(express.static('public'));

// API Routes
app.post('/api/verify-pin', (req, res) => {
    const { pin } = req.body;
    console.log(`Received PIN attempt: ${pin}`); // Debug log

    if (!pin) {
        return res.status(400).json({ success: false, message: 'PIN is required' });
    }

    // Hash the input PIN
    const crypto = require('crypto');
    const hash = crypto.createHash('sha256').update(pin).digest('hex');

    console.log(`Computed Hash: ${hash}`); // Debug log
    // console.log(`Expected Hash: ${process.env.PIN_HASH}`); // Don't log expected hash in prod, but ok for debugging locally

    if (hash === process.env.PIN_HASH) {
        console.log('Access Granted');
        res.json({ success: true, message: 'Access Granted' });
    } else {
        console.log('Access Denied');
        res.status(401).json({ success: false, message: 'Invalid PIN' });
    }
});

app.get('/api/memories', (req, res) => {
    // Placeholder for DB fetch
    res.json([]);
});

// Database Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/harshita-birthday';
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB Connection Error:', err));

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
