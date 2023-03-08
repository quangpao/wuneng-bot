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
    let name = interaction.options.getString("song");
    if(name.length > 100)
      name = name.substring(0, 99)
    const songs = await distube.search(name);
    // await interaction.reply({embeds:[SearchEmbedBuilder(songArr, interaction)]})
    actionRowBuilder.searchRowBuilder(songs).then(async (row) => {
      await interaction.reply({
        embeds: [SearchEmbedBuilder(songs, interaction)],
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
