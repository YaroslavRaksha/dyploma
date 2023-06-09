const validateParams = require("../middleware/validateParams");

const router = require('express').Router();

const {
    getAnalyticsByIdController,
    updateAnalyticsCountController,
} = require('../controllers/analytics');

router.post('/', validateParams([
        { key: 'body', value: 'data' },
    ]),
    updateAnalyticsCountController);

router.get('/:id', validateParams([
        { key: 'params', value: 'id' },
    ]),
    getAnalyticsByIdController);

module.exports = router;

