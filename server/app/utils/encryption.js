const crypto = require('crypto');
const getError = require("./getError");

/*  change names for production use */

const algorithm = process.env.ENCRYPTION_ALGORITHM;
const key = Buffer.from(process.env.ENCRYPTION_KEY, 'base64');


const encrypt = (value) => {
    try {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(algorithm, key, iv);
        let encrypted = cipher.update(value, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return iv.toString('hex') + encrypted;
    }
    catch (error) {
        throw getError('rest', 404, 'Error at formatting data')
    }
};


const decrypt = (encrypted) => {
    try {
        const iv = Buffer.from(encrypted.slice(0, 32), 'hex');
        encrypted = encrypted?.slice(32);
        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
    catch (error) {
        throw getError('rest', 404, 'Error at formatting data')
    }
}

module.exports = {
    encrypt,
    decrypt
}
