
const executeQuery = require('../utils/executeQuery');

const table = 'users';

const createUserModel = async ({ id, email, emailHash, password, secret }) =>
    await executeQuery('INSERT INTO ?? (id, email, email_hash, password, secret) VALUES (?, ?, ?, ?, ?)', [table, id, email, emailHash, password, secret]);

const getUserIdAndPasswordByEmailModel = async (emailHash) =>
    await executeQuery('SELECT id, password FROM ?? WHERE email_hash = ?', [table, emailHash]);

const getUserSecretByIdModel = async (id) =>
    await executeQuery('SELECT secret FROM ?? WHERE id = ?', [table, id]);



module.exports = {
    createUserModel,
    getUserIdAndPasswordByEmailModel,
    getUserSecretByIdModel,
}
