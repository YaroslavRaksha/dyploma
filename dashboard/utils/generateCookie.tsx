

type Cookie = {
    key: string,
    value: string | number,
    expiresInMs?: number,
}

export default function generateCookie({ key: key, value: value, expiresInMs: expiresInMs }: Cookie) {

    if(!expiresInMs) {
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}; Path=/;`;
    }

    const expirationDate = new Date(Date.now() + expiresInMs).toUTCString();

    return `${encodeURIComponent(key)}=${encodeURIComponent(value)}; Path=/; Expires=${expirationDate};`;
}
