
const router = require('express').Router();
const validateUuid = require("../middleware/validateUuid");
const validateParams = require("../middleware/validateParams");

{/* const validateInt = require("../middleware/validateInt"); */}

const {
    createUserController,
    loginUserController,
    verifyUserByIdController,
    getUserSessionByIdController,
} = require('../controllers/user');

router.post(
    '/register', validateParams([
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

router.get('/getSession/:id', validateParams([
        { key: 'params', value: 'id' },
        { key: 'query', value: 'sessionId' },
    ]),
    getUserSessionByIdController)

module.exports = router;
