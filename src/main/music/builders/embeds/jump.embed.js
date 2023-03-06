const { EmbedBuilder } = require("discord.js");
const { Song } = require("distube");
const Color = require("../../../../common/utils/Color");
const Emoji = require("../../../../common/utils/Emoji");
const { formatNumber } = require("../../utils/string.utils");

module.exports = {
  NoSongJump: () => {
    const embed = new EmbedBuilder()
      .setTitle(`${Emoji.loop} - ɴᴏ sᴏɴɢ ᴛᴏ ᴊᴜᴍᴘ`)
      .setDescription("")
      .addFields([
        {
          name: "———",
          value:
            "ʏᴏᴜʀ ǫᴜᴇᴜᴇ ɴᴇᴇᴅ ᴛᴏ ʜᴀᴠᴇ ᴍᴏʀᴇ ᴛʜᴀɴ 2 sᴏɴɢ ᴛᴏ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ.\n———",
        },
      ])
      .setColor(Color.ERROR.DARK)
      .setTimestamp();
    return embed;
  },

  SelectJump: () => {
    const embed = new EmbedBuilder()
      .setTitle(`${Emoji.search} - sᴇʟᴇᴄᴛ ᴊᴜᴍᴘɪɴɢ ᴘᴏsɪᴛɪᴏɴ`)
      .addFields([
        {
          name: "———",
          value: "sᴇʟᴇᴄᴛ ᴛʜᴇ sᴏɴɢ ʏᴏᴜ ᴡᴀɴᴛ ᴛᴏ ᴘʟᴀʏ ɪɴ ᴛʜᴇ ʟɪsᴛ ʙᴇʟᴏᴡ\n———",
        },
      ])
      .setColor(Color.INFO.MAIN)
      .setTimestamp();
    return embed;
  },

  SelectJumpTimedOut: () => {
    const embed = new EmbedBuilder()
      .setTitle(`${Emoji.search} - ᴛɪᴍᴇᴅ ᴏᴜᴛ`)
      .addFields([
        {
          name: "———",
          value: "ᴄᴏᴍᴍᴀɴᴅ ᴛɪᴍᴇᴅ ᴏᴜᴛ, ᴘʟᴇᴀsᴇ ᴅᴏ ɪᴛ ғᴀsᴛᴇʀ ʟᴀᴛᴇʀ\n———",
        },
      ])
      .setColor(Color.INFO.MAIN);
    return embed;
  },

  /**
   *
   * @param {Song} song
   * @returns
   */
  JumpedSong: (song) => {
    console.log(song);
    const embed = new EmbedBuilder()
      .setTitle(`${Emoji.songAdd} - ᴊᴜᴍᴘᴇᴅ ᴛᴏ ᴛʜᴇ sᴏɴɢ`)
      .addFields({
        name: `sᴏɴɢ ɪɴғᴏʀᴍᴀᴛɪᴏɴ`,
        value: `**ɴᴀᴍᴇ**: [${song.name}](${song.url})
        \n**ᴀʀᴛɪꜱᴛ**: [${song.uploader.name}](${song.uploader.url})
        \n**ᴠɪᴇᴡ**: ${formatNumber(song.views)}
        \n**ᴅᴜʀᴀᴛɪᴏɴ**: ${song.formattedDuration}`,
        inline: true,
      })
      .setImage(song.thumbnail)
      .setThumbnail(
        "https://cdn.discordapp.com/avatars/1058625768063766548/b15ede9fa47bc57db91e9f414a5c31e1.png?size=4096&ignore=true)."
      )
      .setColor(Color.SUCCESS.LIGHT)
      .setFooter({
        text: `Requested by ${
          song.member.nickname === null
            ? song.member.user.username
            : song.member.nickname
        }`,
        iconURL: song.member.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();
    return embed;
  },
};
