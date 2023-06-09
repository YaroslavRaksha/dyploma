const tryCatch = require("../utils/tryCatch");
const {getProductsByStoreIdControllerService} = require("../services/products");

const getProductsByStoreIdController = tryCatch(async(req, res) => {

    const id = req.params.id;
    const { handle } = req.query;

    const products = await getProductsByStoreIdControllerService({
        storeId: id,
        handle: handle,
    });

    return res
        .status(200)
        .json(products)
});


module.exports = {
    getProductsByStoreIdController,
}
