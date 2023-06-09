const getError = require("../utils/getError");

const validateInt = (paramType, paramName) => (req, res, next) => {

    const value = req[paramType][paramName];

    if (value && !/^\d+$/.test(value)) {
        throw getError('rest', 400, `Invalid ${paramName}`)
    }

    req[paramType][paramName] = parseInt(value);

    next();
}

module.exports = validateInt;
