
export default function errorHandler(handler) {
    return async (req, res) => {
        try {
            await handler(req, res);
        } catch (err) {
            const { status, errorMessage } = err;

            res.status(status || 500)
                .json({
                    errorMessage: errorMessage || 'Internal server error'
                });
        }
    };
}
