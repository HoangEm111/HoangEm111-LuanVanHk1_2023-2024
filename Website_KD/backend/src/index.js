// File: server.js hoặc app.js
const express = require('express');
const app = express();
const apiRoutes = require('./routes/api');

app.use(express.json());
app.use('/api', apiRoutes);  // Đảm bảo rằng router được sử dụng với tiền tố /api

app.listen(3000, () => {
  console.log('Server đang chạy trên cổng 3000');
});
