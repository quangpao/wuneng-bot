const { ChatInputCommandInteraction } = require("discord.js");
const { DisTube } = require("distube");
const {
  NotInVoiceChannelEmbedBuilder,
} = require("../../../../common/builders/General");
const { QueueEmpty } = require("../../builders/embeds/queue.embed");
const {
  AlrAutoplay,
  SongRepeatMode,
  QueueRepeatMode,
  DisabledRepeatMode,
} = require("../../builders/embeds/repeat.embed");
const { slashBuilder } = require("../../builders/repeat.builder");
const { joinSpeakerCheck } = require("../../utils/permission.check");

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
    if (!joinSpeakerCheck(interaction, channel)) return;

    const queue = distube.getQueue(interaction.guildId);
    if (queue === undefined)
      return await interaction.reply({ embeds: [QueueEmpty()] });

    if (queue.autoplay)
      return await interaction.reply({ embeds: [AlrAutoplay()] });

    const toggle = interaction.options.getString("toggle");

    switch (toggle) {
      case "1": {
        distube.setRepeatMode(interaction.guildId, 1);
        await interaction.reply({
          embeds: [SongRepeatMode(queue.songs[0], interaction.member)],
        });
        break;
      }

      case "2": {
        distube.setRepeatMode(interaction.guildId, 2);
        await interaction.reply({
          embeds: [QueueRepeatMode(queue.songs[0], interaction.member)],
        });
        break;
      }

      default: {
        distube.setRepeatMode(interaction.guildId, 0);
        await interaction.reply({ embeds: [DisabledRepeatMode()] });
      }
    }
  },
};
