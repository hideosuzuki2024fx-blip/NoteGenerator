export async function onRequestPost({ request }) {
  const body = await request.json();

  const res = await fetch(
    "https://api.github.com/repos/hideosuzuki2024fx-blip/NoteGenerator/actions/workflows/relay.yml/dispatches",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ref: "main",
        inputs: {
          message: body.message || "Triggered from GPTs via relay.ts",
        },
    }),
    }
  );

  return new Response(JSON.stringify({
    ok: res.ok,
    status: res.status,
    res: await res.text()
  }), { status: 200 });
}