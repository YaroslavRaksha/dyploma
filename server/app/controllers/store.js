const tryCatch = require("../utils/tryCatch");

const {
    createStoreService,
    getAllStoresService,
} = require('../services/store');


{/* getStoreRedisSettingsController, */}

const createStoreController = tryCatch(async(req, res) => {

    const { name, accessToken } = req.body;

    const createdStore = await createStoreService({
        name: name,
        accessToken: accessToken,
    });

    return res
        .status(200)
        .json(createdStore)
});

const getAllStoresController = tryCatch(async(req, res) => {
    const stores = await getAllStoresService();

    return res
        .status(200)
        .json(stores)

});


module.exports = {
    createStoreController,
    getAllStoresController,
}
