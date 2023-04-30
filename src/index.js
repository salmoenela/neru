import config from "./config.json" assert { type: "json" };
const { DISCORD_TOKEN } = Deno.env.toObject();

connect();

export async function connect(cache) {
  const ws = new WebSocket(cache?.resume_gateway_url || "wss://gateway.discord.gg/?v=10&encoding=json");
  ws.cache = cache || { seq: null };
  ws.config = config;
  ws.events = {};

  for await (const dir of Deno.readDir("./src/events")) {
    ws.events[dir.name] = {};
    for await (const file of Deno.readDir(`./src/events/${dir.name}`)) {
      const event = (await import(`./events/${dir.name}/${file.name}`)).default;
      ws.events[dir.name][file.name.split(".")[0]] = event;
    }
  }

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
        seq: cache?.seq,
        token: DISCORD_TOKEN,
        session_id: cache?.session_id
      }
    };
    ws.send(JSON.stringify(cache ? resumePayload : identifyPayload))
  }

  ws.onmessage = async function(ctx) {
    const data = JSON.parse(ctx.data);
    data.ws = ws;

    console.log(data);

    const event = Object.values(ws.events.gateway).find(event => event.op === data.op);
    if (event) return await event.execute(data);
  }

  ws.onclose = function(ctx) {
    console.log(ctx);
    const resumeableOpcodes = [
      4000, 4001, 4002, 4003, 4005, 4007, 4008, 4009
    ];
    if (resumeableOpcodes.includes(ctx.code) || !ctx.code) {
      connect(ws.cache);
    } else connect();
  }
}
