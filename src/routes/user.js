const { Router } = require('express');
const router = Router();
const userController = require('../controller/user');

router.get('/:userId/histories', userController.getUserPurchase);

module.exports = router;