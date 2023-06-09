
export default function getCookieValue({context: context, key: key}) {

    const { req, res } = context;
    const cookieString = req.headers.cookie || '';

    const cookies = cookieString.split(';').reduce((acc, cookie) => {
        const [name, value] = cookie.trim().split('=');
        acc[name] = value;
        return acc;
    }, {})

    return cookies[key];

}

