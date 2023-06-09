const getError = require("../utils/getError");

const {
    getAnalyticsByIdModel,
    getAnalyticsByIdAndQueryModel,
    updateAnalyticsCountModel
} = require('../models/analytics');

const { checkExistingStoreIdsModel } = require('../models/store');

const sourceMapping = {
    col: 1,
    rec: 2,
}

const actionMapping = {
    view: 1,
    click: 2,
}

const MAX_BATCH_SIZE = 2;

const getAnalyticsByIdService = async ({ storeId, sourceFromQuery }) => {

    const analytics = sourceFromQuery
        ? await getAnalyticsByIdAndQueryModel({ storeId: storeId, sourceId: sourceMapping[sourceFromQuery], })
        : await getAnalyticsByIdModel({ storeId: storeId, })


    if(analytics?.length < 1) {
        throw getError('rest', 400, 'Invalid request data. Analytics were not found.')
    }

    const parsedAnalytics = JSON.parse(JSON.stringify(analytics));

    const convertedAnalytics = parsedAnalytics.map(({ source_id, action_id, count } ) => {

        const source = sourceFromQuery ? sourceFromQuery : Object.keys(sourceMapping).find((key) => sourceMapping[key] === source_id);
        const action = Object.keys(actionMapping).find((key) => actionMapping[key] === action_id);

        return {
            source,
            action,
            count,
        }
    });

    return {
        analytics: convertedAnalytics
    }
}


{/* { storeId: '1', action: 'rec', source: 'search', count: 1, } */}
let analyticsToPush = []

const updateAnalyticsCountService = async ({ analytics }) => {
    analytics.forEach(analytic => {
        const existingAnalytic = analyticsToPush.find(item =>
            item.storeId === analytic.storeId
            && item.action === analytic.action
            && item.source === analytic.source
        );

        if (existingAnalytic) {
            existingAnalytic.count += analytic.count;
        } else {
            analyticsToPush.push(analytic);
        }
    });

    if (analyticsToPush.length >= MAX_BATCH_SIZE) {
        await executeBatchUpdate(analyticsToPush.splice(0, MAX_BATCH_SIZE));
        return {
            ok: true,
        };
    }

    return {
        ok: true,
    };
};

/* helper function to batch update */
const executeBatchUpdate = async (batchToUpdate) => {
    const storeIdsSet = new Set(batchToUpdate.map(analytic => analytic.storeId));
    const storeIdsArray = [...storeIdsSet];

    const existingStoreIdsPacket = await checkExistingStoreIdsModel({ storeIds: storeIdsArray  });
    const existingStoreIds = existingStoreIdsPacket?.map((row) => row?.id);

    const validBatch = batchToUpdate.filter(({storeId, action, source}) =>
        existingStoreIds?.includes(storeId)
        && actionMapping[action]
        && sourceMapping[source]
    );

    if (validBatch.length === 0) {
        return;
    }

    for (const { storeId, action, source, count } of validBatch) {
        await updateAnalyticsCountModel({
            storeId: storeId,
            actionId: actionMapping[action],
            sourceId: sourceMapping[source],
            count: count,
        });
    }
};


module.exports = {
    getAnalyticsByIdService,
    updateAnalyticsCountService,
}
