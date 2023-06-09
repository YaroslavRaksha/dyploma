
const executeQuery = require('../utils/executeQuery');

const table = 'stores';

const createStoreModel = async ({ id, name, accessToken, accessTokenHash }) =>
    await executeQuery('INSERT INTO ?? (id, name, access_token, access_token_hash) VALUES (?, ?, ?, ?)', [table, id, name, accessToken, accessTokenHash]);

const getAllStoresModel = async () =>
    await executeQuery(`SELECT id, name FROM ??`, [table]);

const getDefaultStoreIdModel = async () =>
    await executeQuery(`SELECT id FROM ?? LIMIT 1`, [table]);

const checkExistingStoreIdsModel = async ({ storeIds }) => {
    const placeholders = storeIds.map(() => '?').join(', ');
    return await executeQuery(`SELECT id FROM ?? WHERE id IN (${placeholders})`, [table, ...storeIds]);
}

module.exports = {
    createStoreModel,
    getAllStoresModel,
    getDefaultStoreIdModel,
    checkExistingStoreIdsModel,
}
