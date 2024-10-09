const express = require('express');
const cors = require('cors'); // Đảm bảo chỉ có một dòng này
const db = require('./app/config/db');
const authRoutes = require('./routes/auth');// Đường dẫn đến file chứa router của bạn
const AdminPage  = require('./routes/admin');
const productRoutes = require('./routes/productRoutes');
const app = express();

require('dotenv').config();

app.use(cors()); // Sử dụng cors
app.use(express.json()); // Để xử lý JSON trong body

app.use('/api/auth', authRoutes);// Kết nối router với đường dẫn /api/auth
app.use('/api/admin', AdminPage);// Sử dụng route admin
app.use('/api/products', productRoutes);


// Bắt đầu server
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
