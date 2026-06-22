export async function handleScriptRoute(event) {
    const userAgent = event.request.headers.get("user-agent") || "";
    const isCurl = /curl|wget|httpie|libcurl/i.test(userAgent);

    if (isCurl) {
        const targetUrl =
            "https://gist.githubusercontent.com/PokumeKachi/af266a673d3fe4e66ddd77863140d88a/raw/6bb149d8105939ab5169cedfedc10af1e5db6740/script.sh";
        const contentPrefix = `# Script sourced from ${targetUrl}\n`;

        try {
            const response = await fetch(targetUrl);

            if (!response.ok) {
                return new Response(
                    `echo "Error: Failed to fetch script (status ${response.status})"`,
                    {
                        status: response.status,
                        headers: { "Content-Type": "text/plain" },
                    },
                );
            }

            const content = await response.text();

            return new Response(contentPrefix + content, {
                status: 200,
                headers: { "Content-Type": "text/plain" },
            });
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : String(error);
            return new Response(`echo "Error fetching script: ${errorMessage}"`, {
                status: 500,
                headers: { "Content-Type": "text/plain" },
            });
        }
    }

    return null;
}
