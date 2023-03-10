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
const { nextJumpMenuBuilder } = require("../../builders/jump.builder");
const { isQueueExist, isJumpable } = require("../../utils/distube.check");
const { inVoiceChannel } = require("../../utils/permission.check");

module.exports = {
  data: nextJumpMenuBuilder(),

  /**
   * Jump to next song (SelectMenu)
   * @param {StringSelectMenuInteraction} interaction
   * @param {{distube: DisTube}}
   */
  execute: async (interaction, { distube }) => {
    const queue = distube.getQueue(interaction.guildId);

    // Permission check
    if (!(await inVoiceChannel(interaction))) return;
    if (!(await isQueueExist(interaction, queue))) return;
    if (!isJumpable(interaction, queue)) return;

    try {
      // Collect jump menu interaction
      await collectorHandler(interaction, queue);
      distube.removeAllListeners("playSong");

      const song = await queue.jump(parseInt(interaction.values[0]));

      // Update jump menu
      const { previousSongs, songs } = distube.getQueue(interaction.guildId);
      const rows = await jumpRowBuilder(
        [ ...previousSongs, songs[0] ],
        songs.slice(1)
      );

      await interaction.update({
        embeds: [JumpedSong(song)],
        components: rows,
      });
    } catch (error) {
      logger(error, interaction.user);
    }
  },
};

/**
 *
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
