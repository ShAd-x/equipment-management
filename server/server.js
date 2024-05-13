import express, { json } from 'express';
import { connect } from 'mongoose';
const app = express();

// Middleware
app.use(json());

// Routes
app.use('/api/users', require('./routes/users').default);

// Connection à MongoDB
connect('mongodb://root:root@host.docker.internal:27017/angularprojet?authSource=admin')
    .then(() => {
        console.log('Connected to MongoDB')

        const port = 3000;
        app.listen(port, () => console.log(`Server running on port ${port}`));
    })
    .catch(err => console.error('Could not connect to MongoDB', err));