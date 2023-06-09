const speakeasy = require('speakeasy');
const generateQrCodeForLogin = require('../utils/generateQRCodeForLogin');
const oneWayHash = require('../utils/oneWayHash');
const getError = require('../utils/getError');
const { getRedisHash, setRedisHash } = require("../utils/redisUtils");
const { generateRandomId } = require('../utils/idGenerator');
const { hash, compare } = require('../utils/bcryptHash');
const { encrypt, decrypt } = require('../utils/encryption');

const {
    createUserModel,
    getUserIdAndPasswordByEmailModel,
    getUserSecretByIdModel,
} = require('../models/user');

const createUserService = async ({email, password}) => {
    const secret = speakeasy.generateSecret({ length: 20 });

    const id = generateRandomId();
    const encryptedEmail = await encrypt(email);
    const hashedEmail = await oneWayHash(email);
    const hashedPassword = await hash(password);
    const encryptedSecret = await encrypt(secret.base32);

    const newUser = {
        id: id,
        email: encryptedEmail,
        emailHash: hashedEmail,
        password: hashedPassword,
        secret: encryptedSecret,
    }

    await createUserModel(newUser);

    return {
        ok: true,
    }
};

const loginUserService = async ({loginEmail, loginPassword}) => {

    const hashedEmail = await oneWayHash(loginEmail);
    const result = await getUserIdAndPasswordByEmailModel(hashedEmail);

    if(result?.length > 0) {

        const { id, password } = result[0];

        const passwordIsCorrect = await compare({
            value: loginPassword,
            compareValue: password
        });

        if(passwordIsCorrect) {
            const result = await getUserSecretByIdModel(id);
            const encryptedSecret = result[0]['secret'];
            const decryptedSecret = decrypt(encryptedSecret);

            const qrCode = await generateQrCodeForLogin(decryptedSecret);

            return {
                userId: id,
                qrCode: qrCode,
            }
        }

        throw getError('rest', 401, 'Incorrect password')

    }

    throw getError('rest', 401, 'Incorrect email')
}

const verifyUserByIdService = async ({id, token}) => {

    /* also provide timestamp */
    const result = await getUserSecretByIdModel(id);

    if(result?.length > 0) {
        const encryptedSecret = result[0]['secret'];
        const decryptedSecret = decrypt(encryptedSecret);

        const verified = speakeasy.totp.verify({
            encoding: 'base32',
            secret: decryptedSecret,
            token: token,
        });

        if(!verified) {
            throw getError('rest', 401, 'Not verified. Make sure token is right.');
        }

        return {
            verified: true,
        }
    }
    else {
        throw getError('rest', 404, 'User id not found.')
    }
}

/* This services were created for user/controller for login */

const setUserSession = async ({ userId, sessionId }) => {
    return await setRedisHash(`session:${userId}:${sessionId}`, {
        userId: userId,
        sessionId: sessionId,
    }, Date.now() + 24 * 60 * 60)
}

const getUserSessionByIdService = async ({ userId, sessionId }) => {

    return await getRedisHash(`session:${userId}:${sessionId}`);
}


module.exports = {
    createUserService,
    loginUserService,
    verifyUserByIdService,
    setUserSession,
    getUserSessionByIdService,
}
