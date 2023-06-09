const validateParams = require("../middleware/validateParams");

const router = require('express').Router();

const {
    createStoreController,
    getAllStoresController,
} = require('../controllers/store');

router.post('/', validateParams([
        { key: 'body', value: 'name' },
        { key: 'body', value: 'accessToken' },
    ]),
    createStoreController);

router.get('/', getAllStoresController);

{/* router.get('/:id', validateUuid('params', 'id'), getStoreRedisSettingsController); */}

module.exports = router;
