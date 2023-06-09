const bcryptHash = require('bcryptjs');

const hash = async (value) => {
    const salt = bcryptHash.genSaltSync(12);
    return await bcryptHash.hash(value, salt);
};

const compare = async ({value, compareValue}) => {

    const valid = await bcryptHash.compare(value, compareValue);

    {/*
    if (!validPass) {
        throw new Error('Incorrect password');
    }
    */}

    return valid;
}

module.exports = {
    hash,
    compare
}
