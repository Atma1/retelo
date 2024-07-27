const { Router } = require('express');
const router = Router();
const purchaseController = require('../controller/purchase');

router.get('/all', purchaseController.getAllPurchases);
router.post('/', purchaseController.savePurchase);
router.post('/update/:purchaseId', purchaseController.updatePurchaseStatus);

module.exports = router;