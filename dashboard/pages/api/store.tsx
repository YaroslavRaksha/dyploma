import type { NextApiRequest, NextApiResponse } from 'next'
import backendApi from '../../utils/backendApiInstance';
import errorHandler from "../../utils/errorHandler";

type Data = {
    stores: [],
    status?: number,
    errorMessage?: string,
}

async function analyticsHandler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    const { data } = await backendApi.get('/store');
    const { stores } = data;

    return res.status(200).json({ stores: stores })

}

export default errorHandler(analyticsHandler)
