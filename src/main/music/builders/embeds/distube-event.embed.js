const { EmbedBuilder, GuildMember, bold } = require("discord.js");
const { Song, Playlist } = require("distube");
const Color = require("../../../../common/utils/Color");
const Emoji = require("../../../../common/utils/Emoji");

module.exports = {
  /**
   *
   * @param {Song} song
   * @param {GuildMember} member
   * @returns
   */
  PlaySong: (song) => {
    const embed = new EmbedBuilder()
      .setTitle(`${Emoji.play} - ɴᴏᴡ ᴘʟᴀʏɪɴɢ`)
      .setDescription(`[${song.name}](${song.url})`)
      .setThumbnail(song.thumbnail)
      .setColor(Color.INFO.LIGHT)
      .setFooter({
        text: `Requested by ${song.member.nickname}`,
        iconURL: song.member.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();

    return embed;
  },

  /**
   *
   * @param {Song} song
   */
  AddSong: (song) => {
    const embed = new EmbedBuilder()
      .setTitle(`${Emoji.songAdd} - sᴏɴɢ ᴀᴅᴅᴇᴅ`)
      .addFields({
        name: `sᴏɴɢ ɪɴғᴏʀᴍᴀᴛɪᴏɴ`,
        value: `${bold("ɴᴀᴍᴇ")}: [${song.name}](${song.url})
        \n${bold("ᴀʀᴛɪꜱᴛ")}: [${song.uploader.name}](${song.uploader.url})
        \n${bold("ᴠɪᴇᴡ")}: ${song.views}
        \n${bold("ᴅᴜʀᴀᴛɪᴏɴ")}: ${song.formattedDuration}`,
        inline: true,
      })
      .setImage(song.thumbnail)
      .setThumbnail(
        "https://cdn.discordapp.com/avatars/1058625768063766548/b15ede9fa47bc57db91e9f414a5c31e1.png?size=4096&ignore=true)."
      )
      .setColor(Color.SUCCESS.LIGHT)
      .setFooter({
        text: "Requested by " + song.member.nickname,
        iconURL: song.member.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();
    return embed;
  },

  /**
   *
   * @param {Playlist} playlist
   */
  AddPlaylist: (playlist) => {
    const embed = new EmbedBuilder()
      .setTitle(`${Emoji.playlist} - ᴘʟᴀʏʟɪsᴛ ᴀᴅᴅᴇᴅ`)
      .addFields({
        name: `ᴘʟᴀʏʟɪsᴛ ɪɴғᴏʀᴍᴀᴛɪᴏɴ`,
        value: `${bold("ɴᴀᴍᴇ")}: [${playlist.name}](${playlist.url})\n`
      })
      .setImage(playlist.thumbnail)
      .setThumbnail(
        "https://cdn.discordapp.com/avatars/1058625768063766548/b15ede9fa47bc57db91e9f414a5c31e1.png?size=4096&ignore=true)."
      )
      .setColor(Color.SUCCESS.MAIN)
      .setFooter({
        text: "Requested by " + playlist.member.nickname,
        iconURL: playlist.member.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();

      let limit = 4;
      if (playlist.songs.length < limit) limit = playlist.songs.length;
      for (let x = 1; x <= limit ; x++) {
        embed.addFields({
          name: `sᴏɴɢ #${eval(`Emoji.a${x}`)}`,
          // eslint-disable-next-line no-magic-numbers
          value: `[${playlist.songs[x - 1].name}](${playlist.songs[x - 1].url})`
        })
      }

    return embed;
  }
};
