const validateParams = require("../middleware/validateParams");
const isAuthenticated = require("../middleware/isAuthenticated");

const router = require('express').Router();

const {
    getAnalyticsByIdController,
    updateAnalyticsCountController,
} = require('../controllers/analytics');

router.post('/', validateParams([
        { key: 'body', value: 'data' },
    ]),
    updateAnalyticsCountController);

router.get('/:id', isAuthenticated(), getAnalyticsByIdController);

module.exports = router;

