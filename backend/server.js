const express = require('express');
const cors = require('cors');
const bugRoute = require('./routes/bug.route');
const connectDB  = require('./config/db');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());


app.use('/api/bugs',bugRoute);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
}

module.exports = app;