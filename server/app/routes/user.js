
const router = require('express').Router();
const validateUuid = require("../middleware/validateUuid");
const validateParams = require("../middleware/validateParams");
const isAuthenticated = require("../middleware/isAuthenticated");

const {
    createUserController,
    loginUserController,
    verifyUserByIdController,
} = require('../controllers/user');

router.post(
    '/register', isAuthenticated(), validateParams([
        { key: 'body', value: 'email' },
        { key: 'body', value: 'password' },
    ]),
    createUserController);

router.post('/login', validateParams([
        { key: 'body', value: 'email' },
        { key: 'body', value: 'password' },
    ]),
    loginUserController);

router.post('/verify/:id', validateParams([
        { key: 'params', value: 'id' },
        { key: 'body', value: 'token' },
    ]),
    validateUuid('params', 'id'),
    verifyUserByIdController);

module.exports = router;
