const { ModalSubmitInteraction } = require("discord.js");
const { FixedEmbedBuilder } = require("../../builders/embeds/fixed.embed");
const { FixedModalBuilder } = require("../../builders/fixed.builder");
const { ReviewRowBuilder } = require("../../builders/review.builder");
const channels = require("../../utils/channels");

module.exports = {
  data: FixedModalBuilder(),

  /**
   *
   * @param {ModalSubmitInteraction} interaction
   */
  execute: async (interaction) => {
    const role = interaction.guild.roles.cache.get("1084850100322447521");
    if (!interaction.member.roles.cache.has(role.id))
      return await interaction.reply({
        content: `You are not a developer`,
        ephemeral: true,
      });

    const timeEffort = interaction.fields.getTextInputValue("time-effort");
    const mergeRequest = interaction.fields.getTextInputValue("merge-request");
    const sourceMessage = interaction.message;

    await interaction.update({
      embeds: [
        FixedEmbedBuilder(
          sourceMessage,
          interaction.user,
          timeEffort,
          mergeRequest
        ),
      ],
      components: [],
    });

    await channels.report(interaction).send({
      embeds: [
        FixedEmbedBuilder(
          sourceMessage,
          interaction.user,
          timeEffort,
          mergeRequest
        ),
      ],
      components: [ReviewRowBuilder()],
    });
  },
};
