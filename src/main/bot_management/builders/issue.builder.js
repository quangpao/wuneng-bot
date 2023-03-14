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

  IssueRowBuilder: (id = undefined) => {
    const row = new ActionRowBuilder().addComponents(
      createIssueMentionBuilder(id)
    );
    return row;
  },
};

function createIssueMentionBuilder(id = undefined) {
  const mentionBuilder = new UserSelectMenuBuilder()
    .setPlaceholder("Assign to a developer")
    .setMinValues(1)
    .setMaxValues(1);

  if (id) {
    mentionBuilder.setCustomId(`issue ${id}`);
  } else {
    mentionBuilder.setCustomId(`issue`);
  }
  return mentionBuilder;
}
