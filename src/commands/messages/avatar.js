export default {
  data: {
    name: "avatar",
    description: "ᵎ⌇ Lihat avatar pengguna",
    aliases: ["av"]
  },
  async execute(message) {
    const avatarURL = "https://cdn.discordapp.com/" + (message.member.avatar ? `guilds/${message.guild_id}/users/${message.author.id}/avatars/${message.member.avatar}.${message.member.avatar.startsWith("a_") ? "gif" : "png"}` : (message.author.avatar ? `avatars/${message.author.id}/${message.author.avatar}.${message.author.avatar.startsWith("a_") ? "gif" : "png"}` : `embed/avatars/${message.author.discriminator % 5}.png`)) + "?size=2048";
    console.log(avatarURL)
    const avatarData = await fetch(avatarURL);
    console.log(avatarData);
    const avatar = await avatarData.blob();
    console.log(avatar);
    const body = new FormData();
    body.set("payload_json", JSON.stringify({
      message_reference: { message_id: message.id, guild_id: message.guild_id }
    }))
    body.set("files[0]", avatar);
    const response = await fetch(`https://discord.com/api/v${message.ws.cache.v}/channels/${message.channel_id}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bot ${Deno.env.get("DISCORD_TOKEN")}`,
      },
      body
    });
    console.log((await response.json()));
  }
}
