const { StringSelectMenuInteraction, TextChannel } = require("discord.js");
const {
  AssignBuilder,
  DeferredEmbedBuilder,
  DuplicatedEmbedBuilder,
} = require("../../builders/assign.builder");
const {
  OpenEmbedBuilder,
  OpenRowBuilder,
} = require("../../builders/open.builder");
const channels = require("../../utils/channels");

module.exports = {
  data: AssignBuilder(),

  /**
   *
   * @param {StringSelectMenuInteraction} interaction
   */
  execute: async (interaction) => {
    const role = interaction.guild.roles.cache.get("1084850100322447521");

    if (!interaction.member.roles.cache.has(role.id))
      return await interaction.reply({
        content: `You are not a developer`,
        ephemeral: true,
      });

    const chosen = interaction.values[0];
    const /** @type TextChannel */ textChannel = channels.future(interaction);
    const sourceMessage = interaction.message;

    switch (chosen) {
      case "open": {
        await interaction.update({
          embeds: [OpenEmbedBuilder(sourceMessage)],
          components: [OpenRowBuilder()],
        });
        break;
      }
      case "deferred": {
        await interaction.update({
          embeds: [DeferredEmbedBuilder(sourceMessage, interaction.user)],
          components: [],
        });
        await textChannel.send({
          embeds: [DeferredEmbedBuilder(sourceMessage, interaction.user)],
        });
        break;
      }
      case "duplicated": {
        await interaction.update({
          embeds: [DuplicatedEmbedBuilder(sourceMessage, interaction.user)],
          components: [],
        });
        break;
      }
    }
  },
};
