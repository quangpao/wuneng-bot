const {
  StringSelectMenuInteraction,
  ComponentType,
  TextChannel,
} = require("discord.js");
const { DisTube } = require("distube");
const { jumpRowBuilder } = require("../../builders/action-row.builder");
const { PlaySong } = require("../../builders/embeds/distube-event.embed");
const { JumpedSong } = require("../../builders/embeds/jump.embed");
const { previousJumpMenuBuilder } = require("../../builders/jump.builder");
const { isQueueExist, isJumpable } = require("../../utils/distube.check");
const { inVoiceChannel } = require("../../utils/permission.check");

module.exports = {
  data: previousJumpMenuBuilder(),

  /**
   *
   * @param {StringSelectMenuInteraction} interaction
   * @param {{distube: DisTube}}
   */
  execute: async (interaction, { distube }) => {
    const queue = distube.getQueue(interaction.guildId);

    if (!inVoiceChannel(interaction)) return;
    if (!isQueueExist(interaction, queue)) return;
    if (!isJumpable(interaction, queue)) return;

    await collectorHandler(interaction, distube);

    distube.removeAllListeners("playSong");

    const song = await distube.jump(
      interaction.guildId,
      parseInt(interaction.values[0])
    );

    const { previousSongs, songs } = distube.getQueue(interaction.guildId);
    const rows = await jumpRowBuilder(
      previousSongs.slice(0, previousSongs.length - 1),
      [ previousSongs[previousSongs.length - 1], ...songs ]
    );

    await interaction.update({
      embeds: [JumpedSong(song)],
      components: rows,
    });
  },
};

async function collectorHandler(interaction, distube) {
  const /** @type TextChannel */ textChannel = interaction.channel;
  const collector = textChannel.createMessageComponentCollector({
    time: 10000,
    componentType: ComponentType.StringSelect,
  });

  collector.on("end", (collected) => {
    if (collected.size === 0) {
      interaction.editReply({
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
