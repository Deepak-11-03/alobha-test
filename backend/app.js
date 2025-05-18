const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth.routes');
const repositoryRoutes = require('./routes/repository.routes');
const fileRoutes = require('./routes/file.routes');

const multer = require('multer');
dotenv.config();
const app = express();

// Middleware
app.use(cors({
   origin: 'https://super-cod-4prvrvq6gw6f5qjp-5173.app.github.dev', // OR better: specific frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // only if you're using cookies or sessions
}));


// app.use(cors({
//   origin: (origin, callback) => {
//     console.log(origin)
//     if (!origin || origin.includes('github.dev')) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
// }));

app.use(express.json({ limit: '50mb' })); // Increase payload limit
app.use(express.urlencoded({ extended: true, limit: '50mb' })); // Increase payload limit

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/repositories', repositoryRoutes);
app.use('/api/files', fileRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start Server
const PORT = process.env.PORT ;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));