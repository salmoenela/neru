export default {
  data: {
    name: "avatar",
    description: "ᵎ⌇ Lihat avatar pengguna",
    aliases: ["av"]
  },
  async execute(message) {
    const content = "https://cdn.discordapp.com/" + (message.member.avatar ? `guilds/${message.guild_id}/users/${message.author.id}/avatars/${message.member.avatar}.${message.member.avatar.startsWith("a_") ? "gif" : "png"}` : (message.author.avatar ? `avatars/${message.author.id}/${message.author.avatar}.${message.author.avatar.startsWith("a_") ? "gif" : "png"}` : `embed/avatars/${message.author.discriminator % 5}.png`));
    const response = await fetch(`https://discord.com/api/v${message.ws.cache.v}/channels/${message.channel_id}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bot ${Deno.env.get("DISCORD_TOKEN")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content
      })
    });
    console.log((await response.json()));
  }
}
