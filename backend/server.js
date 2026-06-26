const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const port = process.env.PORT || 5000;
const userRoutes = require('./routes/UserRoute');
const productRoutes = require('./routes/ProductRoute');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
