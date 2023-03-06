const { ChatInputCommandInteraction, Client } = require("discord.js");
const { DisTube } = require("distube");
const {
  NotInVoiceChannelEmbedBuilder,
} = require("../../../../common/builders/General");
const { delay } = require("../../../../common/utils/Utilities");
const { jumpRowBuilder } = require("../../builders/action-row.builder");
const {
  NoSongJump,
  SelectJump,
  SelectJumpTimedOut,
} = require("../../builders/embeds/jump.embed");
const { QueueEmpty } = require("../../builders/embeds/queue.embed");
const { slashBuilder } = require("../../builders/jump.builder");

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
    const queue = distube.getQueue(interaction.guildId);
    if (queue === undefined)
      return await interaction.reply({ embeds: [QueueEmpty()] });
    if (queue.songs.length === 1)
      return await interaction.reply({ embeds: [NoSongJump()] });

    console.log(queue.songs[0]);
    await jumpRowBuilder(queue)
      .then(async (row) => {
        interaction.reply({
          embeds: [SelectJump()],
          components: row,
        });
        if (queue.songs[0].duration > 10) {
          await delay(10000);
        } else {
          await delay(queue.songs[0].duration * 1000);
        }
        interaction.editReply({
          embeds: [SelectJumpTimedOut()],
          components: [],
        });
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
