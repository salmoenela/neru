export default {
  t: "READY",
  async execute(data) {
    const { v, user, resume_gateway_url, session_id } = data.d;
    data.ws.cache = {
      v, client: user, session_id, resume_gateway_url, seq: data.s
    };

    data.ws.commands = {};
    for await (const dir of Deno.readDir("./src/commands")) {
      data.ws.commands[dir.name] = {};
      for await (const file of Deno.readDir(`./src/commands/messages`)) {
        const command = (await import(`../../commands/${dir.name}/${file.name}`)).default;
        data.ws.commands[dir.name][file.name.split(".")[0]] = command;
      }
    }
  }
}
