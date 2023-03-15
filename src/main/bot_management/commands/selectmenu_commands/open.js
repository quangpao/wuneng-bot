const { StringSelectMenuInteraction } = require("discord.js");
const { DeprecatedModalBuilder } = require("../../builders/deprecated.builder");
const { FixedModalBuilder } = require("../../builders/fixed.builder");
const { OpenBuilder } = require("../../builders/open.builder");

module.exports = {
  data: OpenBuilder(),

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

    switch (chosen) {
      case "fixed": {
        await interaction.showModal(FixedModalBuilder());
        break;
      }
      case "deprecated": {
        await interaction.showModal(DeprecatedModalBuilder());
        break;
      }
    }
  },
};
