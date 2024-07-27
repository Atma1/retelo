const { Router } = require('express');
const router = Router();
const productController = require('../controller/product');
const upload = require('../middleware/multer');

router.get('/', productController.getAllProducts);
router.get('/', productController.searchProduct);
router.get('/:productId', upload.single('image'), productController.getProduct);
router.post('/update/:productId', upload.single('image'), productController.updateProduct);
router.post('/', upload.single('image'), productController.addProduct);
router.delete('/:productId', productController.deleteProduct);

module.exports = router;