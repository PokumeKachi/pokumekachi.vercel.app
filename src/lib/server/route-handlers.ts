export async function handleScriptRoute(event) {
    const userAgent = event.request.headers.get("user-agent") || "";
    const isCurl = /curl|wget|httpie|libcurl/i.test(userAgent);

    if (isCurl) {
        const targetUrl =
            "https://gist.githubusercontent.com/PokumeKachi/af266a673d3fe4e66ddd77863140d88a/raw/6bb149d8105939ab5169cedfedc10af1e5db6740/script.sh";
        const command = `# Script sourced from ${targetUrl}\nTMPFILE=$(mktemp) && curl -L -o "$TMPFILE" "${targetUrl}" && chmod 755 "$TMPFILE" && printf '\n\033[1;32mNext, run \033[1;33m%s\033[1;32m to \033[1;36mexecute\033[1;32m the script!\033[0m\n\n' "$TMPFILE"`;
        return new Response(command, {
            status: 200,
            headers: { "Content-Type": "text/plain" },
        });
    }

    return null;
}
