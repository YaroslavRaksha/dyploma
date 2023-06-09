const getError = require("../utils/getError");

const uuidRegex = /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-4[a-fA-F0-9]{3}-[89aAbB][a-fA-F0-9]{3}-[a-fA-F0-9]{12}$/;

const validateUuid = (paramType, paramName) => (req, res, next) => {

    const uuid = req[paramType][paramName];

    if (uuid && !uuidRegex.test(uuid)) {
        throw getError('rest', 400, `Invalid ${paramName}`)
    }

    next();
}

module.exports = validateUuid;
