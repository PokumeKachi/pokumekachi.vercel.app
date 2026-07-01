export async function handleScriptRoute(event) {
    const userAgent = event.request.headers.get("user-agent") || "";
    const isCurl = /curl|wget|httpie|libcurl/i.test(userAgent);

    if (isCurl) {
        const targetUrl =
            "https://raw.githubusercontent.com/PokumeKachi/dotfiles-stow/refs/heads/main/bootstrap.sh";
        const command = `# Script sourced from ${targetUrl}\nTMPFILE=$(mktemp) && curl -L -o "$TMPFILE" "${targetUrl}" && chmod 755 "$TMPFILE" && printf '\n\n\n\x1b[1;32mNext, run \x1b[1;33m%s\x1b[1;32m to \x1b[1;36mexecute\x1b[1;32m the script!\x1b[0m\n\n' "$TMPFILE"`;
        return new Response(command, {
            status: 200,
            headers: { "Content-Type": "text/plain" },
        });
    }

    return null;
}
