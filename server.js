const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./src/routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/reactbackdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

app.use('/auth', authRoutes);

// Handle other routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// 404 Not Found
app.use((req, res) => {
    res.status(404).send('404 Not Found');
});