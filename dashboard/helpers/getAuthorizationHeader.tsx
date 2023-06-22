import getCookies from "../utils/getCookies";

const getAuthorizationHeader = (cookie) => {
    const { userId, sessionId } = getCookies(cookie);

    if(!userId || !sessionId) {
        throw {
            status: 401,
            errorMessage: 'Not authorized!!'
        }
    }

    return `${userId}|${sessionId}`;
}

export default getAuthorizationHeader;
