const slowDown = require("express-slow-down");

const apiLimiter = slowDown({
    windowMs: 15  * 60 * 1000,
    delayAfter: 100,
    delayMs: 500,
});

module.exports = {
    apiLimiter,
}
