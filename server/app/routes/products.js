const validateParams = require("../middleware/validateParams");

const router = require('express').Router();

const {
    getProductsByStoreIdController,
} = require('../controllers/products');

router.get('/:id', validateParams([
        { key: 'query', value: 'handle' },
    ]),
    getProductsByStoreIdController);


module.exports = router;
