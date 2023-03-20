const {
  MentionableSelectMenuInteraction,
  Guild,
  TextChannel,
} = require("discord.js");
const {
  AssignEmbedBuilder,
  AssignRowBuilder,
} = require("../../builders/assign.builder");
const { IssueMentionBuilder } = require("../../builders/issue.builder");
const channels = require("../../utils/channels");

module.exports = {
  data: IssueMentionBuilder(),

  /**
   *
   * @param {MentionableSelectMenuInteraction} interaction
   */
  execute: async (interaction) => {
    const role = interaction.guild.roles.cache.get("1084850100322447521");
    if (!interaction.member.roles.cache.has(role.id))
      return await interaction.reply({
        content: `You are not a developer`,
        ephemeral: true,
      });

    const assigner = interaction.members.get(interaction.values[0]);
    const sourceMessage = interaction.message;

    if (!assigner.roles.cache.has(role.id))
      return await interaction.reply({
        content: `The user <@${assigner.id}> is not a developer`,
        ephemeral: true,
      });

    await interaction.update({ components: [] });
    const /** @type TextChannel */ textChannel = channels.issues(interaction);
    await textChannel.send({
      embeds: [
        AssignEmbedBuilder(
          sourceMessage,
          interaction.users.get(interaction.values[0])
        ),
      ],
      components: [AssignRowBuilder()],
    });
  },
};