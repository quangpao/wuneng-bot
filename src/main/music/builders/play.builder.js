const {
  SlashCommandBuilder,
  ButtonBuilder,
  EmbedBuilder,
} = require("discord.js");
const { SUCCESS } = require("../../../common/utils/color");

module.exports = {
  slashBuilder: () => {
    const builder = new SlashCommandBuilder()
      .setName("play")
      .setDescription("Play a song in a voice channel")
      .addStringOption((option) => {
        option
          .setName("song")
          .setDescription("The song you want to play")
          .setRequired(true);
      });

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
