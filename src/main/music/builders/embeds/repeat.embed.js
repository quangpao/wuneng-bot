const { EmbedBuilder, GuildMember } = require("discord.js");
const { Song, Queue } = require("distube");
const Color = require("../../../../common/utils/Color");
const Emoji = require("../../../../common/utils/Emoji");
const { formatNumber } = require("../../../../common/utils/Utilities");

module.exports = {
  AlrAutoplay: () => {
    const embed = new EmbedBuilder()
      .setTitle(`${Emoji.search} - ᴀᴜᴛᴏᴘʟᴀʏ ɪs ᴀʟʀᴇᴀᴅʏ ᴏɴ`)
      .addFields([
        {
          name: "———",
          value:
            "ʏᴏᴜ ᴄᴀɴ'ᴛ ᴜsɪɴɢ `ʀᴇᴘᴇᴀᴛ` ᴄᴏᴍᴍᴀɴᴅ ᴡʜᴇɴ `ᴀᴜᴛᴏᴘʟᴀʏ` ɪs ᴏɴ.\nᴛᴜʀɴ ɪᴛ **ᴏғғ** ғɪʀsᴛ ʙʏ ᴜsɪɴɢ: `/ᴀᴜᴛᴏᴘʟᴀʏ ᴏғғ`.\n———",
        },
      ])
      .setColor(Color.SECONDARY.DARK)
      .setTimestamp();
    return embed;
  },

  /**
   *
   * @param {Song} song
   * @param {GuildMember} member
   * @returns
   */
  SongRepeatMode: (song, member) => {
    const embed = new EmbedBuilder()
      .setTitle(`${Emoji.loop} - sᴏɴɢ ʟᴏᴏᴘ ᴍᴏᴅᴇ`)
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
      .setColor(Color.WARNING.MAIN)
      .setFooter({
        text: `Requested by ${
          member.nickname === null ? member.user.username : member.nickname
        }`,
        iconURL: member.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();
    return embed;
  },

  /**
   * @param {Queue} queue
   * @param {GuildMember} member
   */
  QueueRepeatMode: (queue, member) => {
    const songs = queue.songs;
    const embed = new EmbedBuilder()
      .setTitle(`${Emoji.loop} - ǫᴜᴇᴜᴇ ʟᴏᴏᴘ ᴍᴏᴅᴇ`)
      .addFields({
        name: "ǫᴜᴇᴜᴇ ɪɴғᴏʀᴍᴀᴛɪᴏɴ:",
        value: `sᴏɴɢs: ${songs.length}\nᴅᴜʀᴀᴛɪᴏɴ: [${queue.formattedCurrentTime}/${queue.formattedDuration}]\nɪɴ: [${queue.voiceChannel.name}](${queue.voiceChannel.url})\n———`,
      })
      // .setImage(playlist.thumbnail)
      .setThumbnail(songs[0].thumbnail)
      .setColor(Color.WARNING.MAIN)
      .setFooter({
        text: `Requested by ${
          member.nickname === null ? member.user.username : member.nickname
        }`,
        iconURL: member.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();

    let limit = 4;
    if (songs.length < limit) limit = songs.length;
    for (let x = 1; x <= limit; x++) {
      embed.addFields({
        name: `sᴏɴɢ ${eval(`Emoji.a${x}`)}`,
        value: `[${songs[x - 1].name}](${songs[x - 1].url})`,
      });
    }
    return embed;
  },

  DisabledRepeatMode: () => {
    const embed = new EmbedBuilder()
      .setTitle(`${Emoji.loop} - ᴅɪsᴀʙʟᴇᴅ ʟᴏᴏᴘ ᴍᴏᴅᴇ`)
      .addFields([
        {
          name: "———",
          value:
            "ᴛʜᴇ ʟᴏᴏᴘ ᴍᴏᴅᴇ ʜᴀs ʙᴇᴇɴ ᴅɪsᴀʙʟᴇᴅ.\nᴜsɪɴɢ `/ǫᴜᴇᴜᴇ` ᴛᴏ ᴛʀᴀᴄᴋɪɴɢ ʏᴏᴜʀ ǫᴜᴇᴜᴇ———",
        },
      ])
      .setColor(Color.SECONDARY.DARK)
      .setTimestamp();
    return embed;
  },
};
