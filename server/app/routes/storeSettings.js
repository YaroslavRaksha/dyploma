const validateParams = require("../middleware/validateParams");

const router = require('express').Router();

const {
    getStoreSettingsController,
    updateStoreSettingsController,
} = require('../controllers/storeSettings');


// fields: [key, key]
router.get('/:id', validateParams([
        { key: 'params', value: 'id' },
    ]),
    getStoreSettingsController);


// [{key: productsPerPage, data: 32}, ...{}]
router.post('/:id', validateParams([
        { key: 'params', value: 'id' },
        { key: 'body', value: 'data' },
    ]),
    updateStoreSettingsController);

module.exports = router;
