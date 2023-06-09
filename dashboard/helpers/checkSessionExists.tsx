
import backendApiInstance from '../utils/backendApiInstance';

export async function checkSessionExists(userId, sessionId) {
    if (userId && sessionId) {
        const { data } = await backendApiInstance.get('/user/getSession/' + userId + `?sessionId=${sessionId}`);
        const { exists } = data;
        return exists;
    }
    return false;
}
