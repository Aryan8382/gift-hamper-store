const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const userRoutes = require('./routes/UserRoute');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});