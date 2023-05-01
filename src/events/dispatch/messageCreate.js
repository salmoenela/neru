export default {
  t: "MESSAGE_CREATE",
  async execute(data) {
    const message = data.d;
    const { prefix } = data.ws.config;
    message.ws = data.ws;
    if (message.author.bot) return;
    
    if (message.content.startsWith(prefix)) {
      message.args = message.content.slice(prefix.length).trim().split(/ +/g);
      const commandName = message.args.shift();
      const command = Object.values(data.ws.commands.messages).find(ctx => (ctx.data.name === commandName) || ctx.data.aliases.includes(commandName));
      if (command) return await command.execute(message);
    }
  }
}
