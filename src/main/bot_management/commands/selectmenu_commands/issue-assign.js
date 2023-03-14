const {
  MentionableSelectMenuInteraction,
  Guild,
  Message,
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
    const /** @type Guild */ guild = interaction.guild;
    const assigner = interaction.members.get(interaction.values[0]);
    const role = guild.roles.cache.get("1084850100322447521");

    if (!assigner.roles.cache.has(role.id))
      return await interaction.reply({
        content: `The user <@${assigner.id}> is not a developer`,
        ephemeral: true,
      });

    await interaction.update({ components: [] });
    const /** @type TextChannel */ textChannel = channels.issues(interaction);
    const /** @type Message */ message = await textChannel.send({
        embeds: [
          AssignEmbedBuilder(
            interaction.message,
            interaction.users.get(interaction.values[0]),
            interaction.extraData
          ),
        ],
      });

    await textChannel.send({
      components: [AssignRowBuilder(message.id)],
    });
  },
};
