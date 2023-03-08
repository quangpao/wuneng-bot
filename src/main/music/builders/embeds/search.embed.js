const { EmbedBuilder, ChatInputCommandInteraction } = require("discord.js");
const { SearchResult } = require("distube");
const Color = require("../../../../common/utils/Color");
const Emoji = require("../../../../common/utils/Emoji");
const { formatNumber } = require("../../utils/string.utils");
module.exports = {
  /**
   *
   * @param {SearchResult} songs
   * @param {ChatInputCommandInteraction} interaction
   * @returns
   */
  SearchEmbedBuilder: (songs, interaction) => {
    const embed = new EmbedBuilder()
      .setTitle(`${Emoji.search} ʜᴇʏ ʟᴏᴏᴋ ᴡʜᴀᴛ ɪ ғᴏᴜɴᴅ ʜᴇʀᴇ!\nᴘʀᴇss ʙᴜᴛᴛᴏɴ ᴛᴏ sᴇʟᴇᴄᴛ sᴏɴɢ`)
      .setThumbnail(
        `https://cdn.discordapp.com/attachments/997416866622492692/1080827420510265444/temp.png`
      )
      .setColor(Color.INFO.LIGHT)
      .setFooter({
        text: `Requested by ${interaction.member.displayName}`,
        iconURL: interaction.member.displayAvatarURL(),
      })
      .setTimestamp();
    for (let i = 0; i < 5; i++) {
      const song = songs[i]
      embed.addFields({
        name: `ㅤ`,
        value: `**${i + 1}:**[${song.name}](${song.url})(${song.formattedDuration})\n**ᴀʀᴛɪꜱᴛ:** ${song.uploader.name}\n**ᴠɪᴇᴡ:** ${formatNumber(song.views)}`,
      });
    }
    return embed;
  },
};
