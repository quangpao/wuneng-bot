const {
  ChatInputCommandInteraction,
  ComponentType,
  TextChannel,
} = require("discord.js");
const { DisTube } = require("distube");
const actionRowBuilder = require("../../builders/action-row.builder");
const { SearchEmbedBuilder } = require("../../builders/embeds/search.embed");
const { SearchSlashBuilder } = require("../../builders/search.builder");

module.exports = {
  data: SearchSlashBuilder(),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {{distube: DisTube}}
   */
  execute: async (interaction, { distube }) => {
    const name = interaction.options.getString("song");
    const songArr = await distube.search(name);
    // await interaction.reply({embeds:[SearchEmbedBuilder(songArr, interaction)]})
    actionRowBuilder.searchRowBuilder(songArr).then(async (row) => {
      await interaction.reply({
        embeds: [SearchEmbedBuilder(songArr, interaction)],
        components: [row],
      });
    });
    const /** @type TextChannel */ textChannel = interaction.channel;
    const collector = textChannel.createMessageComponentCollector({
      componentType: ComponentType.Button,
    });
    collector.on("collect", (i) => {
      if (i.customId.split(" ")[0] === "selecttoplay") interaction.deleteReply();
      collector.removeAllListeners("collect")
    });
  },
};
