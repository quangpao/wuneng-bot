const {
  ChatInputCommandInteraction,
  TextChannel,
  ComponentType,
} = require("discord.js");
const { DisTube } = require("distube");
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
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {{distube: DisTube}}
   */
  execute: async (interaction, { distube }) => {
    const queue = distube.getQueue(interaction.guildId);

    if (!inVoiceChannel(interaction)) return;
    if (!isQueueExist(interaction, queue)) return;
    if (!isJumpable(interaction, queue)) return;

    await collectorHanler(interaction, queue);

    const rows = await jumpRowBuilder(queue.previousSongs, queue.songs);
    await interaction.reply({
      embeds: [SelectJump()],
      components: rows,
    });
  },
};

async function collectorHanler(interaction) {
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
}
