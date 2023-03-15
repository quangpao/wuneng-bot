const { ModalSubmitInteraction, TextChannel } = require("discord.js");
const {
  DeprecatedModalBuilder,
  DeprecatedEmbedBuilder,
} = require("../../builders/deprecated.builder");
const channels = require("../../utils/channels");

module.exports = {
  data: DeprecatedModalBuilder(),

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

    const reason = interaction.fields.getTextInputValue("deprecated-reason");
    const /** @type TextChannel */ textChannel = channels.future(interaction);
    const sourceMessage = interaction.message;

    await interaction.update({
      embeds: [DeprecatedEmbedBuilder(sourceMessage, interaction.user, reason)],
      components: [],
    });

    await textChannel.send({
      embeds: [DeprecatedEmbedBuilder(sourceMessage, interaction.user, reason)],
    });
  },
};
