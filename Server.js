const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectDB } = require('./DBConnection');

const customerRoutes = require('./routes/customerRoutes');
const beneficiaryRoutes = require('./routes/beneficiaryRoutes');
const planRoutes = require('./routes/planRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());
app.use(cors());

// simple health check
app.get('/', (req, res) => res.send({ ok: true, uptime: process.uptime() }));

// attach routes
app.use('/api/customers', customerRoutes);
app.use('/api/beneficiaries', beneficiaryRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/auth', authRoutes);

// start server after DB connects
const PORT = process.env.PORT || 5000;
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
  })
  .catch(err => {
    console.error('Failed to connect to DB, server not started', err);
    process.exit(1);
  });
