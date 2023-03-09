const { ChatInputCommandInteraction } = require("discord.js");
const { DisTube } = require("distube");
const {
  AlrAutoplay,
  SongRepeatMode,
  QueueRepeatMode,
  DisabledRepeatMode,
} = require("../../builders/embeds/repeat.embed");
const { slashBuilder } = require("../../builders/repeat.builder");
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
    if (!isQueueExist(interaction, queue)) return;
    if (queue.autoplay)
      return await interaction.reply({ embeds: [AlrAutoplay()] });

    const toggle = interaction.options.getString("toggle");
    await setRepeatMode(interaction, distube, queue, toggle);
  },
};

async function setRepeatMode(interaction, distube, queue, toggle) {
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
}
