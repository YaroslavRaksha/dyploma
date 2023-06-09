
const errorHandler = (error, req, res, next) => {

    const { status } = error.error;
    return res.status(status || 500).json(error || 'Internal Server Error');
}

module.exports = errorHandler;
