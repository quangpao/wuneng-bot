const { ChatInputCommandInteraction } = require("discord.js");
const { DisTube } = require("distube");
const {
  NotInVoiceChannelEmbedBuilder,
} = require("../../../../common/builders/General");
const { slashBuilder } = require("../../builders/autoplay.builder");
const Autoplay = require("../../builders/embeds/autoplay.embed");
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
    checkQueue(interaction, queue);

    toggleAutoplay(
      distube.toggleAutoplay(interaction.guildId),
      interaction,
      queue
    );
  },
};

async function checkQueue(interaction, queue) {
  if (queue === undefined)
    return await interaction.reply({ embeds: [QueueEmpty()] });
  if (queue.songs[0].source !== "youtube")
    return await interaction.reply({ embeds: [Autoplay.NotYoutube()] });
}

async function toggleAutoplay(autoplay, interaction, queue) {
  if (autoplay) {
    await interaction.reply({ embeds: [Autoplay.AutoplayOn(queue)] });
  } else {
    await interaction.reply({ embeds: [Autoplay.AutoplayOff(queue)] });
  }
}
