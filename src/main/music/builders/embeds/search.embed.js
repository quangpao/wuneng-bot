const { EmbedBuilder, ChatInputCommandInteraction } = require("discord.js");
const { SearchResult } = require("distube");
const Color = require("../../../../common/utils/Color");
const Emoji = require("../../../../common/utils/Emoji");
const { formatNumber } = require("../../utils/string.utils");
module.exports = {
  /**
   *
   * @param {SearchResult} songArr
   * @param {ChatInputCommandInteraction} interaction
   * @returns
   */
  SearchEmbedBuilder: (songArr, interaction) => {
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
      let songname = songArr[i].name
      if (songname.length >= 50){
        songname = songname.substr(0, 40) + '...'
      }
      embed.addFields({
        name: `ㅤ`,
        value: `**${i + 1}:**[${songname}](${songArr[i].url})(${songArr[i].formattedDuration})\n**ᴀʀᴛɪꜱᴛ:** ${songArr[i].uploader.name}\n**ᴠɪᴇᴡ:** ${formatNumber(songArr[i].views)}`,
      });
    }
    return embed;
  },
};
