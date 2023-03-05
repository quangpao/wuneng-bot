const { EmbedBuilder } = require("discord.js");
const { Song } = require("distube");
const Color = require("../../../../common/utils/Color");
const Emoji = require("../../../../common/utils/Emoji");

module.exports = {
  NoSkip: () => {
    const embed = new EmbedBuilder()
      .setTitle(`${Emoji.pause} - ᴛʜᴇʀᴇ ɪs ɴᴏ sᴏɴɢ ᴛᴏ sᴋɪᴘ`)
      .addFields([
        {
          name: "———",
          value: `ᴛʜᴇʀᴇ ɪs ɴᴏ sᴏɴɢ ᴛᴏ sᴋɪᴘ.\n———`,
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
  SkipSong: (song) => {
    const embed = new EmbedBuilder()
      .setTitle(`${Emoji.play} - sᴋɪᴘᴘɪɴɢ sᴏɴɢ`)
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
