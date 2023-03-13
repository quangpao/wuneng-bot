const { MentionableSelectMenuInteraction, Guild } = require("discord.js");
const { AssignEmbedBuilder } = require("../../builders/assign.builder");
const { IssueMentionBuilder } = require("../../builders/issue.builder");

module.exports = {
  data: IssueMentionBuilder(),

  /**
   *
   * @param {MentionableSelectMenuInteraction} interaction
   */
  execute: async (interaction) => {
    const /** @type Guild */ guild = interaction.guild;
    const assigner = interaction.members.get(interaction.values[0]);
    const role = guild.roles.cache.get("1084850100322447521");

    if (!assigner) {
      return await interaction.reply({
        content: "The chosen option is not a user",
        ephemeral: true,
      });
    }

    if (!assigner.roles.cache.has(role.id))
      return await interaction.reply({
        content: `The user <@${assigner.id}> is not a developer`,
        ephemeral: true,
      });

    await interaction.update({ components: [] });
    await interaction.client.channels.cache.get("1084869247706091640").send({
      embeds: [
        AssignEmbedBuilder(
          interaction.message,
          interaction.users.get(interaction.values[0]),
          interaction.extraData
        ),
      ],
    });
  },
};
