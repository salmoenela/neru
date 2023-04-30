export default {
  t: "MESSAGE_CREATE",
  async execute(data) {
    const message = data.d;
    if (message.author.bot) return;

    let body;
    if (message.content.startsWith(data.ws.config.prefix)) {
      body = {
        content: "\\* Program prefix command ini masih dalam tahap pengembangan, coba lagi nanti ya (\\*´ω｀\\*)",
        message_reference: { message_id: message.id, guild_id: message.guild_id }
      }
    } else if (message.mentions.find(mention => mention.id === data.ws.cache.client.id)) {
      body = {
        content: "Kalau mau menggunakan comannd, pakai `${data.ws.config.prefix}` sebagai prefix ya.",
        message_reference: { message_id: message.id, guild_id: message.guild_id }
      }
    }

    await fetch(`https://discord.com/api/v${data.ws.cache.v}/channels/${message.channel_id}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bot ${Deno.env.get("DISCORD_TOKEN")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
  }
}
