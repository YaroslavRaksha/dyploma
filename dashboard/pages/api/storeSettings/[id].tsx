import type { NextApiRequest, NextApiResponse } from 'next'
import backendApi from '../../../utils/backendApiInstance';
import errorHandler from "../../../helpers/errorHandler";
import backendRequest from "../../../utils/backendRequest";
import getAuthorizationHeader from "../../../helpers/getAuthorizationHeader";


type Data = {
    ok?: boolean,
    navigation?: string,
    status?: number,
    errorMessage?: string,
}

async function storeSettingsHandler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    const { id, fields } = req.query;

    if(req.method === 'GET') {

        const endpoint = fields ? `${id}?fields=${fields}` : id;

        const { navigation } = await backendRequest(`/storeSettings/${endpoint}`);

        return res.status(200).json({ navigation: JSON.parse(navigation) })
    }

    if(req.method === 'POST') {
        const { updatedSettings } = req.body;

        const authorizationHeader = getAuthorizationHeader(req.headers?.cookie);

        console.log(updatedSettings)
        const { newData } = await backendRequest(`/storeSettings/${id}`, 'POST', {
            headers: {
                Authorization: authorizationHeader,
            },
            data: {
                data: updatedSettings
            }
        });

        if(newData) {
            return res.status(200).json({ ok: true })
        }
    }

}

export default errorHandler(storeSettingsHandler)
