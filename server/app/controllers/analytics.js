const tryCatch = require("../utils/tryCatch");

const {
    getAnalyticsByIdService,
    updateAnalyticsCountService,
} = require('../services/analytics');

const getAnalyticsByIdController = tryCatch(async (req, res) => {

    const id = req.params.id;
    const { source } = req.query;
    const { analytics } = await getAnalyticsByIdService({
        storeId: id,
        sourceFromQuery: source || null,
    });

    return res
        .status(200)
        .json({
            storeId: id,
            analytics: analytics
        })
})

const updateAnalyticsCountController = tryCatch(async(req, res) => {

    const { data } = req.body;

    const analyticsPushed = await updateAnalyticsCountService({
        analytics: data,
    });

    return res
        .status(200)
        .json(analyticsPushed)
});


module.exports = {
    getAnalyticsByIdController,
    updateAnalyticsCountController,
}
