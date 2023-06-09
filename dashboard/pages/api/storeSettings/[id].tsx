import type { NextApiRequest, NextApiResponse } from 'next'
import backendApi from '../../../utils/backendApiInstance';
import errorHandler from "../../../utils/errorHandler";


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

        const { data } = await backendApi.get('/storeSettings/' + endpoint);
        const { navigation } = data;

        return res.status(200).json({ navigation: JSON.parse(navigation) })
    }

    if(req.method === 'POST') {
        const { updatedSettings } = req.body;

        const { data } = await backendApi.post('/storeSettings/' + id, {
            data: updatedSettings,
        });

        const { newData } = data;

        if(newData) {
            return res.status(200).json({ ok: true })
        }
    }

}

export default errorHandler(storeSettingsHandler)
