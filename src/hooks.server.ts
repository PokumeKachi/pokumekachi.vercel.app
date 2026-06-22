import { handleScriptRoute } from "$lib/server/route-handlers";

/** @type {import('@sveltejs/kit').Handle} */

export async function handle({ event, resolve }) {
    const url = event.url.pathname;
    const userAgent = event.request.headers.get("user-agent") || "";
    const isCurl = /curl|wget|httpie|libcurl/i.test(userAgent);

    if (url === "/" && isCurl) {
        const result = handleScriptRoute(event);
        if (result) return result;
    }

    return await resolve(event);
}
