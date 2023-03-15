const {
  EmbedBuilder,
  ActionRowBuilder,
  UserSelectMenuBuilder,
} = require("discord.js");
const { ERROR } = require("../../../common/utils/Color");

module.exports = {
  /**
   *
   * @param {ChatInputCommandInteraction | ButtonInteraction | StringSelectMenuInteraction | MentionableSelectMenuInteraction } interaction
   * @param {string} error
   * @param {string} id
   * @returns
   */
  IssueEmbedBuilder: (interaction, error, id) => {
    const embed = new EmbedBuilder()
      .setTitle(`Issue ID: ${id}`)
      .addFields(
        {
          name: "Error:",
          value: error,
        },
        { name: "Cause by:", value: interaction.user.tag },
        {
          name: "Command/Custom ID:",
          value: interaction.commandName
            ? `/` + interaction.commandName
            : `/` + interaction.customId,
        }
      )
      .setTimestamp()
      .setColor(ERROR.DARK);
    return embed;
  },

  IssueMentionBuilder: () => {
    return createIssueMentionBuilder();
  },

  IssueRowBuilder: () => {
    const row = new ActionRowBuilder().addComponents(
      createIssueMentionBuilder()
    );
    return row;
  },
};

function createIssueMentionBuilder() {
  const mentionBuilder = new UserSelectMenuBuilder()
    .setCustomId(`issue`)
    .setPlaceholder("Assign to a developer")
    .setMinValues(1)
    .setMaxValues(1);

  return mentionBuilder;
}
