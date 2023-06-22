import type { NextApiRequest, NextApiResponse } from 'next'
import backendApi from '../../utils/backendApiInstance';
import errorHandler from "../../helpers/errorHandler";
import getAuthorizationHeader from "../../helpers/getAuthorizationHeader";
import backendRequest from "../../utils/backendRequest";

type Data = {
    stores: [],
    status?: number,
    errorMessage?: string,
}

async function analyticsHandler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    const authorizationHeader = getAuthorizationHeader(req.headers?.cookie);

    const { stores } = await backendRequest(`/store`, 'GET', {
        headers: {
            Authorization: authorizationHeader,
        }
    });

    return res.status(200).json({ stores: stores })

}

export default errorHandler(analyticsHandler)
