export default {
  data: {
    name: "confess",
    description: "ᵎ⌇ Konpes konpes, idk what kind of command is this",
    aliases: ["cf"]
  },
  async execute(message) {
    const supportedGuilds = [
      { guildId: "1021724318767517696", targetChannel: "1100426483756957786" }
    ];
    const confess = supportedGuilds.find(ctx => ctx.guildId === message.guild_id);

    if (!confess) {
      await fetch(`https://discord.com/api/v${message.ws.cache.v}/channels/${message.channel_id}/messages`, {
        method: "POST",
        headers: {
          Authorization: `Bot ${Deno.env.get("DISCORD_TOKEN")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          content: `Hm... kayaknya command ini belum tersedia untuk server ini, silahkan contact owner untuk meminta command ini tersedia untuk server ini.`,
          message_reference: { guild_id: message.guild_id, message_id: message.id }
        })
      });
    } else {
      if (!message.args.length) return await fetch(`https://discord.com/api/v${message.ws.cache.v}/channels/${message.channel_id}/messages`, {
        method: "POST",
        headers: {
          Authorization: `Bot ${Deno.env.get("DISCORD_TOKEN")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          content: `Kata kata confess nya apa bang messi?`,
          message_reference: { guild_id: message.guild_id, message_id: message.id }
        })
      });

      await fetch(`https://discord.com/api/v${message.ws.cache.v}/channels/${confess.targetChannel}/messages`, {
        method: "POST",
        headers: {
          Authorization: `Bot ${Deno.env.get("DISCORD_TOKEN")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          embeds: [{
            color: 0xFF91FC,
            title: "New Confess Message",
            description: message.args.join(" ")
          }]
        })
      });

      await fetch(`https://discord.com/api/v${message.ws.cache.v}/channels/${message.channel_id}/messages/${message.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bot ${Deno.env.get("DISCORD_TOKEN")}`,
        }
      });
    }
  }
}
