const tryCatch = require("../utils/tryCatch");

const {
    getStoreSettingsService,
    updateStoreSettingsService,
} = require('../services/storeSettings');


const getStoreSettingsController = tryCatch(async(req, res) => {

    const id = req.params.id;
    const fields = req.query?.fields?.split(',') || [];

    const storeSettings = await getStoreSettingsService({
        storeId: id,
        fields: fields,
    });

    return res
        .status(200)
        .json(storeSettings)
});

const updateStoreSettingsController = tryCatch(async(req, res) => {

    const id = req.params.id;
    const { data } = req.body;

    const updatedStore = await updateStoreSettingsService({
        storeId: id,
        data: data,
    });

    return res
        .status(200)
        .json(updatedStore)
});


module.exports = {
    getStoreSettingsController,
    updateStoreSettingsController,
}
