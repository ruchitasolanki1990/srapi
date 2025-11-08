const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");
const fs = require("fs").promises;
const dotenv = require("dotenv");
// Load .env file
dotenv.config();

const app = express();
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const homeRoutes = require('./routes/homeRoutes');
app.use('/api/homedetails',homeRoutes);

const aboutRoutes =require('./routes/aboutRoutes');
app.use('/api/aboutdetails',aboutRoutes);

const contactRoutes = require('./routes/contactRoutes');
app.use('/api/contactdetails', contactRoutes);

const categoryRoutes = require('./routes/categoryRoutes');
app.use('/api', categoryRoutes);

const productRoutes = require('./routes/productRoutes');
app.use('/api',productRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.DB_PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 