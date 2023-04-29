connect();

export function connect(cache) {
  const ws = new WebSocket(cache.resume_gateway_url || "wss://gateway.discord.gg/?v=10&encoding=json");
  ws.cache = cache || {};

  ws.onopen = function() {
    const identifyPayload = {
      op: 2,
      d: {
        token: DISCORD_TOKEN,
        properties: { os: "linux", browser: "deno", device: "deno" },
        intents: [1 << 0, 1 << 9, 1 << 15].reduce((x, z) => x | z)
      }
    };
    const resumePayload = {
      op: 6,
      d: {
        seq: cache.seq,
        token: DISCORD_TOKEN,
        session_id: cache.session_id
      }
    };
    ws.send(JSON.stringify(cache ? resumePayload : identifyPayload))
  }
}
