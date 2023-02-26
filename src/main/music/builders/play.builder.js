const {
  SlashCommandBuilder,
  ButtonBuilder,
  EmbedBuilder,
  GuildMember,
} = require("discord.js");
const { Song } = require("distube");
const { SUCCESS } = require("../../../common/utils/Color");

module.exports = {
  slashBuilder: () => {
    const builder = new SlashCommandBuilder()
      .setName("play")
      .setDescription("Play a song in a voice channel")
      .addStringOption((option) =>
        option
          .setName("song")
          .setDescription("Input the song name")
          .setRequired(true)
      );
    return builder;
  },

  buttonBuilder: () => {
    const builder = new ButtonBuilder()
      .setCustomId("play")
      .setStyle("PRIMARY")
      .setLabel("▶")
      .setDisabled(true);
    return builder;
  },

  /**
   *
   * @param {Song} song
   * @param {GuildMember} member
   * @returns
   */
  embedBuilder: (song, member) => {
    const embed = new EmbedBuilder()
      .setTitle("🎶 Now Playing")
      .setDescription(`[${song.name}](${song.url})`)
      .setThumbnail(song.thumbnail)
      .setColor(SUCCESS.LIGHT)
      .setFooter({
        text: `Requested by ${member.nickname}`,
        iconURL: member.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();

    return embed;
  },
};
