const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const userRoutes = require('./routes/users');
const materialRoutes = require('./routes/materials');
const assignmentRequestRoutes = require('./routes/assignmentRequests');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/assignment-requests', assignmentRequestRoutes);
app.use('/api/auth', authRoutes);

// Connection à MongoDB
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(error => {
    console.error(`Could not connect to MongoDB: ${error.message}`);
});
