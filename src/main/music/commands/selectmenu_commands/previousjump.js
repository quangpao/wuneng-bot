const { StringSelectMenuInteraction, ComponentType } = require("discord.js");
const { DisTube } = require("distube");
const {
  NotInVoiceChannelEmbedBuilder,
} = require("../../../../common/builders/General");
const { jumpRowBuilder } = require("../../builders/action-row.builder");
const { PlaySong } = require("../../builders/embeds/distube-event.embed");
const { JumpedSong, NoSongJump } = require("../../builders/embeds/jump.embed");
const { QueueEmpty } = require("../../builders/embeds/queue.embed");
const { previousJumpMenuBuilder } = require("../../builders/jump.builder");

module.exports = {
  data: previousJumpMenuBuilder(),

  /**
   *
   * @param {StringSelectMenuInteraction} interaction
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
    if (queue.songs.length === 1 && queue.previousSongs.length === 0)
      return await interaction.reply({ embeds: [NoSongJump()] });

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

    distube.removeAllListeners("playSong");

    const song = await distube.jump(
      interaction.guildId,
      parseInt(interaction.values[0])
    );

    const { previousSongs, songs } = distube.getQueue(interaction.guildId);

    await jumpRowBuilder(previousSongs.slice(0, previousSongs.length - 1), [
      previousSongs[previousSongs.length - 1],
      ...songs,
    ])
      .then(async (row) => {
        await interaction.update({
          embeds: [JumpedSong(song)],
          components: row,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
