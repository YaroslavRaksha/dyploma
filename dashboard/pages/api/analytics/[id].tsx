import type { NextApiRequest, NextApiResponse } from 'next'
import backendApi from '../../../utils/backendApiInstance';
import errorHandler from "../../../helpers/errorHandler";
import getCookies from "../../../utils/getCookies";
import backendRequest from "../../../utils/backendRequest";
import getAuthorizationHeader from "../../../helpers/getAuthorizationHeader";

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

    const authorizationHeader = getAuthorizationHeader(req.headers?.cookie);

    const { analytics } = await backendRequest(`/analytics/${endpoint}`, 'GET', {
        headers: {
            Authorization: authorizationHeader,
        }
    });


    const totalCounts = analytics.reduce((totals, item) => {
        const { action, count } = item;

        if (totals[action]) {
            totals[action] += count;
        } else {
            totals[action] = count;
        }

        return totals;
    }, {});

    console.log(totalCounts)

    return res.status(200).json({ analytics: totalCounts })

}

export default errorHandler(analyticsHandler)
