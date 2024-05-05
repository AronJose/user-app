const productionHouse = require('../controller/productionHouseController');
const router = require('express').Router();
const multer = require('../helper/multer');
const verifyValidation = require('../helper/TokenValidation')

router.post('/', verifyValidation, multer, productionHouse.addProductionHouse);
router.get('/', verifyValidation, productionHouse.getProductionHouse);
router.get('/:id', verifyValidation, productionHouse.getproductionHouseById);
router.put('/:id', verifyValidation, multer, productionHouse.putProductionHouse);
router.delete('/:id', verifyValidation, productionHouse.deleteProductionHouse);


module.exports = router