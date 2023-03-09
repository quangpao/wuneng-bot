const { ChatInputCommandInteraction } = require("discord.js");
const { DisTube } = require("distube");
const { slashBuilder } = require("../../builders/autoplay.builder");
const Autoplay = require("../../builders/embeds/autoplay.embed");
const { isQueueExist } = require("../../utils/distube.check");
const {
  joinSpeakerCheck,
  inVoiceChannel,
} = require("../../utils/permission.check");

module.exports = {
  data: slashBuilder(),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {{distube: DisTube}}
   */
  execute: async (interaction, { distube }) => {
    const queue = distube.getQueue(interaction.guildId);

    if (!inVoiceChannel(interaction)) return;
    if (!joinSpeakerCheck(interaction)) return;
    if (!canQueueExecutable(interaction, queue)) return;

    toggleAutoplay(
      distube.toggleAutoplay(interaction.guildId),
      interaction,
      queue
    );
  },
};

function canQueueExecutable(interaction, queue) {
  if (!isQueueExist(interaction, queue)) return false;
  if (queue.songs[0].source !== "youtube") {
    interaction.reply({ embeds: [Autoplay.NotYoutube()] });
    return false;
  }
  return true;
}

async function toggleAutoplay(autoplay, interaction, queue) {
  if (autoplay) {
    await interaction.reply({ embeds: [Autoplay.AutoplayOn(queue)] });
  } else {
    await interaction.reply({ embeds: [Autoplay.AutoplayOff(queue)] });
  }
}
