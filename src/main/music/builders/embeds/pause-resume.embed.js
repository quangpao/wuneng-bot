const { EmbedBuilder } = require("discord.js");
const { Queue } = require("distube");
const Color = require("../../../../common/utils/Color");
const Emoji = require("../../../../common/utils/Emoji");

module.exports = {
  /**
   * @param {Queue} queue
   */
  Pause: (queue) => {
    const song = queue.songs;
    const embed = new EmbedBuilder()
      .setTitle(`${Emoji.pause} - ᴘᴀᴜsɪɴɢ sᴏɴɢ`)
      .setDescription(`**ɴᴏᴡ ᴘʟᴀʏɪɴɢ**: [${song[0].name}](${song[0].url})`)
      .addFields([
        {
          name: "———",
          value: `sᴏɴɢ ᴅᴜʀᴀᴛɪᴏɴ: [${queue.formattedCurrentTime}/${queue.formattedDuration}]\n———`,
        },
      ])
      .setThumbnail(song.thumbnail)
      .setColor(Color.SECONDARY.DARK)
      .setTimestamp();

    return embed;
  },
  Resume: (queue) => {
    const song = queue.songs;
    const embed = new EmbedBuilder()
      .setTitle(`${Emoji.play} - ʀᴇsᴜᴍɪɴɢ sᴏɴɢ`)
      .setDescription(`**ɴᴏᴡ ᴘʟᴀʏɪɴɢ**: [${song[0].name}](${song[0].url})`)
      .addFields([
        {
          name: "———",
          value: `sᴏɴɢ ᴅᴜʀᴀᴛɪᴏɴ: [${queue.formattedCurrentTime}/${queue.formattedDuration}]\n———`,
        },
      ])
      .setThumbnail(song.thumbnail)
      .setColor(Color.SECONDARY.DARK)
      .setTimestamp();

    return embed;
  },
};
