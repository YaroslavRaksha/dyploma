import type { NextApiRequest, NextApiResponse } from 'next'
import backendApi from '../../../utils/backendApiInstance';
import errorHandler from "../../../utils/errorHandler";
import { withIronSession } from 'next-iron-session';
import generateCookie from "../../../utils/generateCookie";

type Data = {
    verified?: boolean,
    status?: number,
    errorMessage?: string,

}

async function userVerifyHandler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {


    const { token } = req.body;
    const userId = req.cookies.userId;

    if(!userId) {
        res.status(404)
            .json({
                errorMessage: 'UserId cookie not found. Please, refresh the page.'
            })
    }

    else {

        const { data } = await backendApi.post(`/user/verify/${userId}`, {
            token: token,
        });
        const { verified, sessionId, storesList, storeId } = data;

        if(verified) {

            const cookie = generateCookie({ key: 'sessionId', value: sessionId });
            res.setHeader('Set-Cookie', cookie);

            {/*


            const cookie = [
                generateCookie({ key: 'storeId', value: storeId }),
                generateCookie({ key: 'storesList', value: JSON.stringify(storesList) })
            ];

            res.setHeader('Set-Cookie', cookie);
            */}

            res
                .status(200)
                .json({
                    verified: verified
                })
        }
    }
}

export default errorHandler(userVerifyHandler);
