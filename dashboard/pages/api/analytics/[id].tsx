import type { NextApiRequest, NextApiResponse } from 'next'
import backendApi from '../../../utils/backendApiInstance';
import errorHandler from "../../../utils/errorHandler";

type Data = {
    analytics: [],
    status?: number,
    errorMessage?: string,
}

async function analyticsHandler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    const { id, source } = req.query;
    const endpoint = source ? `${id}?source=${source}` : id;


    const { data } = await backendApi.get('/analytics/' + endpoint);
    const { analytics } = data;

    const totalCounts = analytics.reduce((totals, item) => {
        const { action, count } = item;

        if (totals[action]) {
            totals[action] += count;
        } else {
            totals[action] = count;
        }

        return totals;
    }, {});

    return res.status(200).json({ analytics: totalCounts })

}

export default errorHandler(analyticsHandler)
