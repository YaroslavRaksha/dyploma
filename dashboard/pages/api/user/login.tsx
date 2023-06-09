import type { NextApiRequest, NextApiResponse } from 'next'
import backendApi from '../../../utils/backendApiInstance';
import errorHandler from "../../../utils/errorHandler";
import generateCookie from "../../../utils/generateCookie";

type Data = {
    qrCode?: string,
    status?: number,
    errorMessage?: string,
}

async function userLoginHandler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    const { email, password } = req.body;

    const { data } = await backendApi.post('/user/login', {
        email: email,
        password: password,
    });

    const { userId, qrCode } = data;

    const cookie = generateCookie({ key: 'userId', value: userId, expiresInMs: (24 * 60 * 60 * 1000) });

    res.setHeader('Set-Cookie', cookie);

    res.status(200)
        .json({
            qrCode: qrCode
        })

}

export default errorHandler(userLoginHandler)
