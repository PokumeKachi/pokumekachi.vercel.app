export async function load({ request }) {
    const userAgent = request.headers.get('user-agent') || '';

    const isCurl = /curl|wget|httpie|python-requests/i.test(userAgent);

    const isBot = /googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot/i.test(userAgent);

    return {
        userAgent,
        isCurl,
        isBot,
        // You can return different data based on this check
        message: isCurl ? 'Hello from the terminal!' : 'Hello from your browser!'
    };
}
