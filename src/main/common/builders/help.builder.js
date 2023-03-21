const {
  SlashCommandBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
} = require("discord.js");

module.exports = {
  HelpSlashBuilder: () => {
    const builder = new SlashCommandBuilder()
      .setName("help")
      .setDescription("Show all Wuneng bot slash commands.");

    return builder;
  },

  /**
   * @param {[]} categories
   * @param {string} locale
   */
  HelpSelectMenuRowBuilder: (
    categories = [],
    locale = null,
    disable = false
  ) => {
    const row = new ActionRowBuilder();

    const categoryMenu = new StringSelectMenuBuilder()
      .setCustomId("help-category")
      .setMaxValues(1)
      .setDisabled(disable);

    for (const category in categories) {
      categoryMenu.addOptions({
        label: categories[category].category,
        value: category,
      });
    }
    row.addComponents([categoryMenu]);
    return row;
  },

  HelpSelectMenuBuilder: () => {
    const builder = new StringSelectMenuBuilder()
      .setCustomId("help-category")
      .setMaxValues(1);
    return builder;
  },
};
