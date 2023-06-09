const { v4: uuidv4 } = require('uuid');

/* Make sure to update length of column table in sql table, if size of id will be different */

const generateRandomId = () => uuidv4();

module.exports = {
    generateRandomId
}
