export default {
  t: "MESSAGE_CREATE",
  async execute(data) {
    const message = data.d;
    if (message.author.bot) return;
    if (message.content.startsWith(data.ws.config.prefix)) {
      const response = await fetch(`https://discord.com/api/v${data.ws.cache.v}/channels/${message.channel_id}/messages`, {
        method: "POST",
        headers: {
          Authorization: `Bot ${Deno.env.get("DISCORD_TOKEN")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          content: "* Program prefix command ini masih dalam tahap pengembangan, coba lagi nanti ya (\\*´ω｀\\*)",
          message_reference: { message_id: message.id, guild_id: message.guild_id }
        })
      });
    }
  }
}
