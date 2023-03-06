const {
  ChatInputCommandInteraction,
  TextChannel,
  ComponentType,
} = require("discord.js");
const { DisTube } = require("distube");
const {
  NotInVoiceChannelEmbedBuilder,
} = require("../../../../common/builders/General");
const { jumpRowBuilder } = require("../../builders/action-row.builder");
const {
  NoSongJump,
  SelectJump,
  SelectJumpTimedOut,
} = require("../../builders/embeds/jump.embed");
const { QueueEmpty } = require("../../builders/embeds/queue.embed");
const { slashBuilder } = require("../../builders/jump.builder");

module.exports = {
  data: slashBuilder(),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {{distube: DisTube}}
   */
  execute: async (interaction, { distube }) => {
    const /** @type {VoiceChannel} */ channel =
        interaction.member?.voice?.channel;
    if (channel === undefined || channel === null)
      return await interaction.reply({
        embeds: [NotInVoiceChannelEmbedBuilder()],
      });

    const queue = distube.getQueue(interaction.guildId);
    if (queue === undefined)
      return await interaction.reply({ embeds: [QueueEmpty()] });
    if (queue.songs.length === 1 && queue.previousSongs.length === 0)
      return await interaction.reply({ embeds: [NoSongJump()] });

    const /** @type TextChannel */ textChannel = interaction.channel;
    const collector = textChannel.createMessageComponentCollector({
      time: 60000,
      componentType: ComponentType.StringSelect,
    });

    collector.on("end", (collected) => {
      if (collected.size === 0) {
        interaction.editReply({
          embeds: [SelectJumpTimedOut()],
          components: [],
        });
      }
    });

    await jumpRowBuilder(queue.previousSongs, queue.songs)
      .then(async (row) => {
        interaction.reply({
          embeds: [SelectJump()],
          components: row,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
