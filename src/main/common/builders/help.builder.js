const {
  SlashCommandBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
} = require("discord.js");

module.exports = {

  /**
   * 
   * @returns {SlashCommandBuilder} builder
   */
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
    disable = false,
    choice = -1
  ) => {
    const row = new ActionRowBuilder();

    const categoryMenu = new StringSelectMenuBuilder()
      .setCustomId(`help-category`)
      .setMaxValues(1)
      .setDisabled(disable);

    for (const category in categories) {
      categoryMenu.addOptions({
        label: categories[category].category,
        value: category,
      });
    }

    categoryMenu.setPlaceholder(
      choice === -1 ? "Select a category" : categories[choice].category
    );
    row.addComponents([categoryMenu]);
    return row;
  },

  HelpInfoSelectMenuRowBuilder: (
    commands = [],
    locale = null,
    disable = false,
    category = -1,
    choice = -1
  ) => {
    const row = new ActionRowBuilder();

    const infoMenu = new StringSelectMenuBuilder()
      .setCustomId(`help-info ${category}`)
      .setMaxValues(1)
      .setDisabled(disable);

    for (const command in commands) {
      infoMenu.addOptions({
        label: commands[command].name,
        value: command,
      });
    }

    infoMenu.setPlaceholder(
      choice === -1 ? "Select a command" : commands[choice].name
    );

    row.addComponents([infoMenu]);
    return row;
  },

  HelpInfoSelectMenuBuilder: () => {
    const builder = new StringSelectMenuBuilder()
      .setCustomId("help-info")
      .setMaxValues(1);
    return builder;
  },

  HelpSelectMenuBuilder: () => {
    const builder = new StringSelectMenuBuilder()
      .setCustomId("help-category")
      .setMaxValues(1);
    return builder;
  },
};
