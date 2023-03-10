const {
  ChatInputCommandInteraction,
  TextChannel,
  ComponentType,
} = require("discord.js");
const { DisTube } = require("distube");
const { logger } = require("../../../../common/utils/Utilities");
const { jumpRowBuilder } = require("../../builders/action-row.builder");
const {
  SelectJump,
  SelectJumpTimedOut,
} = require("../../builders/embeds/jump.embed");
const { slashBuilder } = require("../../builders/jump.builder");
const { isQueueExist, isJumpable } = require("../../utils/distube.check");
const { inVoiceChannel } = require("../../utils/permission.check");

module.exports = {
  data: slashBuilder(),

  /**
   * Jump to specific position in queue
   * @param {ChatInputCommandInteraction} interaction
   * @param {{distube: DisTube}}
   */
  execute: async (interaction, { distube }) => {
    const queue = distube.getQueue(interaction.guildId);

    // Permission check
    if (!(await inVoiceChannel(interaction))) return;
    if (!(await isQueueExist(interaction, queue))) return;
    if (!(await isJumpable(interaction, queue))) return;

    try {
      // Check if no response from user
      await collectorHandler(interaction, queue);

      // Send embed and action row
      const rows = await jumpRowBuilder(queue.previousSongs, queue.songs);
      await interaction.reply({
        embeds: [SelectJump()],
        components: rows,
      });
    } catch (error) {
      logger(error, interaction.user);
    }
  },
};

/**
 * Check if no response from user
 * @param {ChatInputCommandInteraction} interaction
 */
async function collectorHandler(interaction) {
  const /** @type TextChannel */ textChannel = interaction.channel;
  const collector = textChannel.createMessageComponentCollector({
    time: 60000,
    componentType: ComponentType.StringSelect,
  });

  collector.on("end", async (collected) => {
    if (collected.size === 0) {
      await interaction.editReply({
        embeds: [SelectJumpTimedOut()],
        components: [],
      });
    }
  });
}
