const tryCatch = require("../utils/tryCatch");
const {generateRandomId} = require("../utils/idGenerator");
const { getAllStoresService, getDefaultStoreIdService } = require("../services/store");
const {
    createUserService,
    loginUserService,
    verifyUserByIdService,
    setUserSession,
    getUserSessionByIdService,
} = require('../services/user');

const createUserController = tryCatch(async(req, res) => {

    const { email, password } = req.body;

    const createdUser = await createUserService({
        email: email,
        password: password,
    });

    return res
        .status(200)
        .json(createdUser)
});

const loginUserController = tryCatch(async(req, res) => {

    const { email, password } = req.body;

    const { userId, qrCode } = await loginUserService({
        loginEmail: email,
        loginPassword: password,
    });

    return res
        .status(200)
        .json({
            userId: userId,
            qrCode: qrCode
        })

})

const verifyUserByIdController = tryCatch(async(req, res) => {

    const id = req.params.id;
    const { token } = req.body;


    const { verified } = await verifyUserByIdService({
        id: id,
        token: token
    });

    const { stores } = await getAllStoresService();
    const { defaultStoreId } = await getDefaultStoreIdService();
    const sessionId = generateRandomId();

    await setUserSession({
        userId: id,
        sessionId: sessionId,
    });


    return res
        .status(200)
        .json({
            sessionId: sessionId,
            verified: verified,
            storeId: defaultStoreId,
            storesList: stores,
        });
})

const getUserSessionByIdController = tryCatch(async (req, res) => {
    const id = req.params.id;
    const { sessionId } = req.query;

    const data = await getUserSessionByIdService({
        userId: id,
        sessionId: sessionId
    });

    return res
        .status(200)
        .json({
            exists: !(Object.keys(data).length === 0)
        })
})

module.exports = {
    createUserController,
    verifyUserByIdController,
    getUserSessionByIdController,
    loginUserController,
}
