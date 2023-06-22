const validateParams = require("../middleware/validateParams");
const isAuthenticated = require("../middleware/isAuthenticated");

const router = require('express').Router();

const {
    createStoreController,
    getAllStoresController,
} = require('../controllers/store');

router.post('/', isAuthenticated(), validateParams([
        { key: 'body', value: 'name' },
        { key: 'body', value: 'accessToken' },
    ]),
    createStoreController);

router.get('/', isAuthenticated(), getAllStoresController);

{/* router.get('/:id', validateUuid('params', 'id'), getStoreRedisSettingsController); */}

module.exports = router;
