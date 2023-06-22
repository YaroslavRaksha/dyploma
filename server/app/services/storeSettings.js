const getError = require("../utils/getError");
const { getRedisHash, updateRedisHash } = require("../utils/redisUtils");


const getStoreSettingsService = async ({ storeId, fields }) => {

    const data = await getRedisHash(`store:${storeId}`, fields);

    if(Object.keys(data).length === 0) {
        throw getError('rest', 400, 'Bad request. No data found')
    }

    return {
        storeId: storeId,
        ...data,
    };
}

const updateStoreSettingsService = async ({ storeId, data }) => {
    return await updateRedisHash(`store:${storeId}`, data)
}


module.exports = {
    getStoreSettingsService,
    updateStoreSettingsService,
}
