const express = require('express');
const mongoose = require('mongoose');
const app = express();

const userRoutes = require('./routes/users');
const materialRoutes = require('./routes/materials');
const assignmentRequestRoutes = require('./routes/assignmentRequests');

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/assignment-requests', assignmentRequestRoutes);

// Connection à MongoDB
mongoose.connect('mongodb://root:root@host.docker.internal:27017/angularprojet?authSource=admin')
    .then(() => {
        console.log('Connected to MongoDB')

        const port = 3000;
        app.listen(port, () => console.log(`Server running on port ${port}`));
    })
    .catch(err => console.error('Could not connect to MongoDB', err));