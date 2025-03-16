const mongoose = require('mongoose');
require('dotenv').config();

// ...existing code...

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// ...existing code...
