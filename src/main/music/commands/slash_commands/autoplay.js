const { ChatInputCommandInteraction } = require("discord.js");
const { DisTube } = require("distube");
const {
  NotInVoiceChannelEmbedBuilder,
} = require("../../../../common/builders/General");
const { slashBuilder } = require("../../builders/autoplay.builder");
const { QueueEmpty } = require("../../builders/embeds/queue.embed");
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

    const toggle = interaction.options.getString("toggle");
    if (toggle === "on") {
      distube.toggleAutoplay(interaction.guildId, true);
      await interaction.reply("Autoplay is now on"); // TODO: Embed
    } else if (toggle === "off") {
      distube.toggleAutoplay(interaction.guildId, false);
      await interaction.reply("Autoplay is now off"); // TODO: Embed
    }
  },
};
