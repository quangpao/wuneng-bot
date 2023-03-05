const { EmbedBuilder } = require("discord.js");
const { Queue } = require("distube");
const Color = require("../../../../common/utils/Color");
const Emoji = require("../../../../common/utils/Emoji");

module.exports = {
  /**
   *
   * @param {Queue} queue
   */
  AutoplayOn: (queue) => {
    const nextSong = queue.songs[0].related[0];
    const embed = new EmbedBuilder()
      .setTitle(`${Emoji.play} - ᴀᴜᴛᴏᴘʟᴀʏ ɪs ᴏɴ`)
      .setDescription(
        `**ɴᴏᴡ ᴘʟᴀʏɪɴɢ**: [${queue.songs[0].name}](${queue.songs[0].url})`
      )
      .addFields([
        {
          name: "ᴀᴜᴛᴏᴘʟᴀʏ ɪɴғᴏʀᴍᴀᴛɪᴏɴ:",
          value: `sᴏɴɢ ᴅᴜʀᴀᴛɪᴏɴ: [${queue.formattedCurrentTime}/${queue.songs[0].formattedDuration}]\nɪɴ: \`[${queue.voiceChannel.name}](${queue.voiceChannel.url})\`\n———`,
        },
        {
          name: "ɴᴇxᴛ sᴏɴɢ ɪɴғᴏʀᴍᴀᴛɪᴏɴ:",
          value: `sᴏɴɢ ɴᴀᴍᴇ: [${nextSong.name}](${nextSong.url})\nᴜᴘʟᴏᴀᴅᴇʀ: [${nextSong.uploader.name}](${nextSong.uploader.url})\nᴅᴜʀᴀᴛɪᴏɴ: ${nextSong.formattedDuration}\n———`,
        },
      ])
      .setThumbnail(queue.songs[0].thumbnail)
      .setColor(Color.SECONDARY.DARK)
      .setTimestamp();

    return embed;
  },

  AutoplayOff: (queue) => {
    const embed = new EmbedBuilder()
      .setTitle(`${Emoji.stop} - ᴀᴜᴛᴏᴘʟᴀʏ ɪs ᴏғғ`)
      .setDescription(
        `**ɴᴏᴡ ᴘʟᴀʏɪɴɢ**: [${queue.songs[0].name}](${queue.songs[0].url})`
      )
      .addFields([
        {
          name: "———",
          value: `ɪᴛ ɴᴏᴡ ᴘʟᴀʏɪɴɢ ᴛʜᴇ ʟᴇғᴛᴏᴠᴇʀ sᴏɴɢs ɪɴ ᴛʜᴇ ǫᴜᴇᴜᴇ.\n———`,
        },
      ])
      .setThumbnail(queue.songs[0].thumbnail)
      .setColor(Color.SECONDARY.DARK)
      .setTimestamp();

    return embed;
  },

  NotYoutube: () => {
    const embed = new EmbedBuilder()
      .setTitle(`${Emoji.pause} - ᴛʜɪs ғᴇᴀᴛᴜʀᴇ ɪs ɴᴏᴛ ᴀᴠᴀɪʟᴀʙʟᴇ`)
      .setDescription(`ᴛʜɪs ғᴇᴀᴛᴜʀᴇ ɪs ᴏɴʟʏ ᴀᴠᴀɪʟᴀʙʟᴇ ғᴏʀ ʏᴏᴜᴛᴜʙᴇ ᴠɪᴅᴇᴏs.`)
      .setColor(Color.ERROR.DARK)
      .setTimestamp();

    return embed;
  },
};
