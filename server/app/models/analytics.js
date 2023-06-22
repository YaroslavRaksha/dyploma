
const executeQuery = require('../utils/executeQuery');

const table = 'analytics';

const getAnalyticsByIdModel = async ({ storeId }) =>
    await executeQuery(`SELECT source_id, action_id, count FROM ?? WHERE store_id = ?`, [table, storeId]);

const getAnalyticsByIdAndQueryModel = async ({ storeId, sourceId }) =>
    await executeQuery(`SELECT action_id, count FROM ?? WHERE store_id = ? AND source_id = ?`, [table, storeId, sourceId]);

const updateAnalyticsCountModel = async ({ storeId, actionId, sourceId, count, }) =>
    await executeQuery(`
        UPDATE analytics SET count = count + ? 
        WHERE store_id = ? 
        AND action_id = ?
        AND source_id = ?
    `, [count, storeId, actionId, sourceId])

const setDefaultAnalyticsModel = async ({ storeId }) =>
    await executeQuery(`
        INSERT INTO ?? (store_id, source_id, action_id, count)
        VALUES 
            (?, 1, 1, 0),
            (?, 1, 2, 0), 
            (?, 2, 1, 0),
            (?, 2, 2, 0)
    `, [table, storeId, storeId, storeId, storeId]);

module.exports = {
    getAnalyticsByIdModel,
    getAnalyticsByIdAndQueryModel,
    updateAnalyticsCountModel,
    setDefaultAnalyticsModel,
}
