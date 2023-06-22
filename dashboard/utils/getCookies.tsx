const getCookies = (cookieString) => {
    const cookies = {};
    if (cookieString) {
        const cookiePairs = cookieString.split(';');
        for (let i = 0; i < cookiePairs.length; i++) {
            const [cookieName, cookieValue] = cookiePairs[i].split('=');
            const trimmedName = cookieName.trim();
            cookies[trimmedName] = cookieValue.trim();
        }
    }
    return cookies;
};

export default getCookies;
