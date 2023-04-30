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

      const icon_url = "https://cdn.discordapp.com/" + (message.member.avatar ? `guilds/${message.guild_id}/users/${message.author.id}/avatars/${message.member.avatar}.${message.member.avatar.startsWith("a_") ? "gif" : "png"}` : (message.author.avatar ? `avatars/${message.author.id}/${message.author.avatar}.${message.author.avatar.startsWith("a_") ? "gif" : "png"}` : `embed/avatars/${message.author.discriminator % 5}.png`));
      const confessMessage = await (await fetch(`https://discord.com/api/v${message.ws.cache.v}/channels/${confess.targetChannel}/messages`, {
        method: "POST",
        headers: {
          Authorization: `Bot ${Deno.env.get("DISCORD_TOKEN")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          embeds: [{
            color: 0xFF91FC,
            author: { name: `${message.author.username}#${message.author.discriminator}`, icon_url },
            description: message.args.join(" ")
          }]
        })
      })).json();

      await fetch(`https://discord.com/api/v${message.ws.cache.v}/channels/${message.channel_id}/messages`, {
        method: "POST",
        headers: {
          Authorization: `Bot ${Deno.env.get("DISCORD_TOKEN")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          content: `Dah, cek <#${confessMessage.channel_id}> ya.`,
          message_reference: { guild_id: message.guild_id, message_id: message.id }
        })
      });
    }
  }
}
