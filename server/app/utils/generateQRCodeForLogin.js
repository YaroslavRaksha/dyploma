
const qrcode = require('qrcode');
const speakeasy = require('speakeasy');
const getError = require("./getError");

const generateQrCodeForLogin = async (secret) => {

    try {
        return await qrcode.toDataURL(speakeasy.otpauthURL({
            secret: secret,
            label: 'Test',
            issuer: 'Test',
            encoding: 'base32',
        }));
    } catch (error) {
        throw getError('rest', 500, 'Error generating QR code');
    }
}

module.exports = generateQrCodeForLogin;
