
const redis = require('../lib/redis');
const getError = require("./getError");

const setRedisHash = async (key, values, expirationInSeconds) => {
    try {
        await new Promise((resolve, reject) => {
            redis.hmset(key, values, (error, result) => {
                if (error) {
                    reject(getError('rest', 500, 'Set Hash failed.'));
                } else {
                    resolve();
                }
            });
        });

        if (expirationInSeconds) {
            await new Promise((resolve, reject) => {
                redis.expire(key, (Math.floor(Date.now() / 1000) + expirationInSeconds), (expireError) => {
                    if (expireError) {
                        reject(getError('rest', 500, 'Set Hash with exparation failed.'));
                    } else {
                        resolve();
                    }
                });
            });
        }

        return { ok: true }
    } catch (error) {
        throw getError('rest', 500, 'Set Hash failed');
    }
};

{/*

const userId = '123';
const defaultStoreId = '456';
const expirationInSeconds = 3600; // 1 hour

await setHash(userId, {
    id: userId,
    storeId: defaultStoreId,
}, optional: expirationInSeconds)


const fieldsToRetrieve = ['id', 'storeId'];

await getHash(userId, optional: fieldsToRetrieve);

*/}

const getRedisHash = async (key, fieldsToRetrieve) => {
    try {
        let values;
        if (!fieldsToRetrieve || fieldsToRetrieve.length === 0) {
            values = await new Promise((resolve, reject) => {
                redis.hgetall(key, (error, result) => {
                    if (error) {
                        reject(getError('rest', 500, 'Get hash data failed'));
                    } else {
                        resolve(result);
                    }
                });
            });
        } else {
            values = await new Promise((resolve, reject) => {
                redis.hmget(key, fieldsToRetrieve, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });
        }

        if (fieldsToRetrieve && fieldsToRetrieve.length > 0 && values.every(value => value === null)) {
            throw getError('rest', 404, 'Fields not found in Redis');
        }

        const hashValues = {};
        if (values) {
            if (!fieldsToRetrieve || fieldsToRetrieve.length === 0) {
                Object.assign(hashValues, values);
            } else {
                for (let i = 0; i < fieldsToRetrieve.length; i++) {
                    hashValues[fieldsToRetrieve[i]] = values[i];
                }
            }
        }

        return hashValues;
    } catch (error) {
        throw error;
    }
};

{/*
const updates = [
    { key: 'field1', value: 'updated_value1' },
    { key: 'field2', value: 'updated_value2' },
];
*/}


const updateRedisHash = async (hashId, updates) => {

    try {
        if(updates?.length < 1 || !(Array.isArray(updates))) {
            throw getError('rest', 400, 'Invalid request data')
        }
        // Check if the hash exists
        const exists = await new Promise((resolve, reject) => {
            redis.exists(hashId, (err, exists) => {
                if (err) {
                    reject(getError('rest', 500, 'Updating hash data failed. Step 1'));
                } else {
                    resolve(exists === 1);
                }
            });
        });

        if (exists) {
            // Get the existing fields in the hash
            const existingFields = await new Promise((resolve, reject) => {
                redis.hkeys(hashId, (err, fields) => {
                    if (err) {
                        reject(getError('rest', 500, 'Updating hash data failed. Step 2'));
                    } else {
                        resolve(fields);
                    }
                });
            });

            // Check if all the fields exist in the hash
            const missingFields = updates.filter(update => !existingFields.includes(update.key));
            if (missingFields.length > 0) {
                throw getError(`Fields do not exist in the hash: ${missingFields.map(field => field.key).join(', ')}`);
            }


            // Perform the updates using HMSET

            const fieldValues = updates.reduce((result, update) => {
                result[update.key] = update.value;
                return result;
            }, {});

            const fieldValuesString = Object.keys(fieldValues).reduce((result, key) => {
                const value = fieldValues[key];
                result[key] = typeof value === 'number' ? value : JSON.stringify(value);
                return result;
            }, {});

            await new Promise((resolve, reject) => {
                redis.hmset(hashId, fieldValuesString, (err, reply) => {
                    if (err) {
                        reject(getError('rest', 500, 'Updating hash data failed. Step 3'));
                    } else {
                        resolve(reply);
                    }
                });
            });

            // Get the new data after the update
            const newData = await new Promise((resolve, reject) => {
                redis.hgetall(hashId, (err, data) => {
                    if (err) {
                        reject(getError('rest', 500, 'Updating hash data failed. Step 4'));
                    } else {
                        resolve(data);
                    }
                });
            });

            return {
                hashId: hashId,
                newData: newData
            };
        } else {
            // Hash doesn't exist, throw an error

            throw getError('rest', 500, `Hash doesn't exist`);
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
}


module.exports = {
    setRedisHash,
    updateRedisHash,
    getRedisHash
};
