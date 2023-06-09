const oneWayHash = require('../utils/oneWayHash');
const { generateRandomId } = require('../utils/idGenerator');
const { encrypt } = require('../utils/encryption');
const redis = require('../lib/redis');
const getError = require("../utils/getError");
const { setRedisHash } = require("../utils/redisUtils");

const {
    createStoreModel,
    getAllStoresModel,
    getDefaultStoreIdModel,
} = require('../models/store');

const {
    setDefaultAnalyticsModel,
} = require('../models/analytics');

const createStoreService = async ({name, accessToken}) => {
    const id = generateRandomId();
    const encryptedAccessToken = await encrypt(accessToken);
    const hashedApiKey = await oneWayHash(accessToken);

    const newStore = {
        id: id,
        name: name,
        accessToken: encryptedAccessToken,
        accessTokenHash: hashedApiKey,
    }


    {/* handle errors and check if id already exists by name ? */}

    await createStoreModel(newStore);

    await setRedisHash(`store:${id}`, {
        storeName: name,
        accessToken: encryptedAccessToken,
        navigation: JSON.stringify([]),
        productsPerPage: 32,
    })

    await setDefaultAnalyticsModel({
        storeId: id,
    });


    return {
        ok: true,
    }

};

const getAllStoresService = async () => {

    const stores = await getAllStoresModel();

    if(stores?.length <= 0) {
        throw getError('rest', 500, 'Getting stores failed')
    }

    return {
        stores: stores
    }
}

/* This service was created for user/verify controller for not verified user */

const getDefaultStoreIdService = async () => {
    const defaultStoreId = await getDefaultStoreIdModel();

    if(defaultStoreId?.length  !== 1 || !(defaultStoreId[0]['id'])) {
        throw getError('rest', 500, 'Getting store id failed')
    }

    return {
        defaultStoreId: defaultStoreId[0]['id']
    }
}

module.exports = {
    createStoreService,
    getAllStoresService,
    getDefaultStoreIdService
}
