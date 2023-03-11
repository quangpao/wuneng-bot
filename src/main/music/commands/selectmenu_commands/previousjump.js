const {
  StringSelectMenuInteraction,
  ComponentType,
  TextChannel,
} = require("discord.js");
const { DisTube } = require("distube");
const { logger } = require("../../../../common/utils/Utilities");
const { jumpRowBuilder } = require("../../builders/action-row.builder");
const { PlaySong } = require("../../builders/embeds/distube-event.embed");
const { JumpedSong } = require("../../builders/embeds/jump.embed");
const { previousJumpMenuBuilder } = require("../../builders/jump.builder");
const { isQueueExist, isJumpable } = require("../../utils/distube.check");
const { inVoiceChannel } = require("../../utils/permission.check");

module.exports = {
  data: previousJumpMenuBuilder(),

  /**
   * Jump to previous song (SelectMenu)
   * @param {StringSelectMenuInteraction} interaction
   * @param {{distube: DisTube}}
   */
  execute: async (interaction, { distube }) => {
    const queue = distube.getQueue(interaction.guildId);

    // Permission check
    if (!(await inVoiceChannel(interaction))) return;
    if (!(await isQueueExist(interaction, queue))) return;
    if (!(await isJumpable(interaction, queue))) return;

    try {
      // Collect jump menu interaction
      await collectorHandler(interaction, distube);
      distube.removeAllListeners("playSong");

      await interaction.update("Jumping to selected song...", {
        components: [],
      });
      const song = await queue.jump(parseInt(interaction.values[0]));

      // Update jump menu
      const { previousSongs, songs } = distube.getQueue(interaction.guildId);
      const rows = await jumpRowBuilder(
        previousSongs.slice(0, previousSongs.length - 1),
        [ previousSongs[previousSongs.length - 1], ...songs ]
      );

      await interaction.editReply({
        embeds: [JumpedSong(song)],
        components: rows,
      });
    } catch (error) {
      logger(error, interaction);
    }
  },
};

/**
 * Collect jump menu interaction
 * @param {StringSelectMenuInteraction} interaction
 * @param {DisTube} distube
 */
async function collectorHandler(interaction, distube) {
  const /** @type TextChannel */ textChannel = interaction.channel;
  const collector = textChannel.createMessageComponentCollector({
    time: 10000,
    componentType: ComponentType.StringSelect,
  });

  collector.on("end", async (collected) => {
    if (collected.size === 0) {
      await interaction.editReply({
        components: [],
      });
    }
    if (distube.listenerCount("playSong") === 0) {
      distube.on("playSong", (queue, song) => {
        if (queue.autoplay) return;
        queue.textChannel.send({
          embeds: [PlaySong(song)],
        });
      });
    }
  });
}
