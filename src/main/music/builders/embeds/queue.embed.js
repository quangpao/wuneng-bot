const { EmbedBuilder } = require("discord.js");
const { Queue } = require("distube");
const Color = require("../../../../common/utils/Color");
const Emoji = require("../../../../common/utils/Emoji");
const { AutoplayOn } = require("./autoplay.embed");

module.exports = {
  /**
   * @param {Queue} queue
   * @param {Number} page
   * @param {Number} maxPage
   */
  Queue: (queue, page, maxPage) => {
    const songs = queue.songs;
    const embed = new EmbedBuilder()
      .setTitle(`${Emoji.playlist} - ǫᴜᴇᴜᴇ`)
      .setDescription(`**ɴᴏᴡ ᴘʟᴀʏɪɴɢ**: [${songs[0].name}](${songs[0].url})`)
      .addFields({
        name: "ǫᴜᴇᴜᴇ ɪɴғᴏʀᴍᴀᴛɪᴏɴ:",
        value: `sᴏɴɢs: ${songs.length}\nᴅᴜʀᴀᴛɪᴏɴ: [${queue.formattedCurrentTime}/${queue.formattedDuration}]\nɪɴ: \`[${queue.voiceChannel.name}](${queue.voiceChannel.url})\`\n———`,
      })
      .setThumbnail(songs[0].thumbnail)
      .setColor(Color.INFO.DARK)
      .setFooter({
        text: `Page ${page}/${maxPage > 0 ? maxPage : 1}`,
      })
      .setTimestamp();
    const startIndex = (page - 1) * 5 + 1;
    const endIndex =
      startIndex + 5 > songs.length ? songs.length : startIndex + 5;

    for (let i = startIndex; i < endIndex; i++) {
      embed.addFields({
        name: `#${i + 1} ${songs[i].name}`,
        value: `ᴜᴘʟᴏᴀᴅᴇʀ: [${songs[i].uploader.name}](${songs[i].uploader.url})`,
      });
    }

    return embed;
  },

  QueueEmpty: () => {
    const embed = new EmbedBuilder()
      .setTitle(`${Emoji.playlist} - ǫᴜᴇᴜᴇ ᴇᴍᴘᴛʏ`)
      .setDescription("ᴛʜᴇʀᴇ ɪs ɴᴏᴛʜɪɴɢ ɪɴ ᴛʜᴇ ᴏᴜᴇᴜᴇ")
      .setColor(Color.ERROR.DARK)
      .setTimestamp();

    return embed;
  },

  /**
   *
   * @param {Queue} queue
   * @returns
   */
  QueueAutoplay: (queue) => {
    return AutoplayOn(queue);
  },
};
