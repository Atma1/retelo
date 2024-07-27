require('dotenv').config()
const PORT = process.env.port || 5000;
const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./src/routes/product');
const purchaseRoutes = require('./src/routes/purchase');
const userRoutes = require('./src/routes/user');
const upload = require('./src/middleware/multer');

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/assets', express.static('./public/image'));

app.use('/api/products', productRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/user/', userRoutes);
app.get('/', upload.single('img'), (req, res) => {
    console.log(req.file?.fieldname);
    res.status(201).json('success');
})

app.listen(PORT, () => console.log('Server running on port ' + PORT));