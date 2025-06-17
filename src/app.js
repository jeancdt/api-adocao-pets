const express = require('express');
const authRoutes = require('./routes/auth.routes');
const publicRoutes = require('./routes/public.routes');
const protectedRoutes = require('./routes/protected.routes');
const debugRoutes = require('./routes/debug.routes');
const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/public', publicRoutes);
app.use('/protected', protectedRoutes);
app.use('/debug', debugRoutes);

module.exports = app;
