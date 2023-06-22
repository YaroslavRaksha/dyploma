const getError = require("../utils/getError");
const { getRedisHash } = require("../utils/redisUtils");

const isAuthenticated = () => async (req, res, next) => {

    try {

        const authorizationHeader = req.headers['authorization'];

        if (!authorizationHeader) {
            throw getError('rest', 400, 'Missing authorization header');
        }

        const [userId, sessionId] = authorizationHeader.split('|');

        const session = await getRedisHash(`session:${userId}:${sessionId}`);

        const exists = !(Object.keys(session).length === 0);

        if (!exists) {
            throw getError('rest', 401, 'Not Authorized');
        }

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = isAuthenticated;
