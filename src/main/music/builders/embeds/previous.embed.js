const { EmbedBuilder } = require("discord.js");
const { Song } = require("distube");
const Color = require("../../../../common/utils/Color");
const Emoji = require("../../../../common/utils/Emoji");

module.exports = {
  NoPrevious: () => {
    const embed = new EmbedBuilder()
      .setTitle(`${Emoji.pause} - ᴛʜᴇʀᴇ ɪs ɴᴏ ᴘʀᴇᴠɪᴏᴜs sᴏɴɢ`)
      .addFields([
        {
          name: "———",
          value: `ᴛʜᴇʀᴇ ɪs ɴᴏ ᴘʀᴇᴠɪᴏᴜs sᴏɴɢ ɪɴ ᴛʜᴇ ᴏᴜᴇᴜᴇ.\n———`,
        },
      ])
      .setColor(Color.ERROR.MAIN)
      .setTimestamp();

    return embed;
  },

  /**
   *
   * @param {Song} song
   * @returns
   */
  PreviousSong: (song) => {
    const embed = new EmbedBuilder()
      .setTitle(`${Emoji.play} - ᴘʟᴀʏɪɴɢ ᴘʀᴇᴠɪᴏᴜs sᴏɴɢ`)
      .setDescription(`**ɴᴏᴡ ᴘʟᴀʏɪɴɢ**: [${song.name}](${song.url})`)
      .addFields([
        {
          name: "———",
          value: `sᴏɴɢ ᴅᴜʀᴀᴛɪᴏɴ: [${song.formattedDuration}]\n———`,
        },
      ])
      .setThumbnail(song.thumbnail)
      .setColor(Color.SECONDARY.DARK)
      .setTimestamp();

    return embed;
  },
};
