const {
  StringSelectMenuInteraction,
  ComponentType,
  TextChannel,
} = require("discord.js");
const { logger } = require("../../../../common/utils/Utilities");
const { HelpCategoryEmbed } = require("../../builders/embeds/help.embed");
const {
  HelpSelectMenuBuilder,
  HelpSelectMenuRowBuilder,
} = require("../../builders/help.builder");

module.exports = {
  data: HelpSelectMenuBuilder(),

  /**
   * @param {StringSelectMenuInteraction} interaction
   */
  execute: async (
    interaction,
    { cooldown, cooldownTime, slashCommandCategories }
  ) => {
    if (cooldown.has(interaction.user.id)) {
      await interaction.reply({
        content: `Please wait ${
          cooldownTime / 1000
        } more second(s) before reusing the command.`,
        ephemeral: true,
      });
      return;
    }

    console.log(interaction.values);

    try {
      const locale = interaction.locale;
      await collectorHandler(interaction, slashCommandCategories, locale);

      await interaction.update({
        embeds: [
          HelpCategoryEmbed(
            slashCommandCategories[interaction.values[0]],
            locale,
            interaction.client.user
          ),
        ],
      });

      // Add user to cooldown
      cooldown.add(interaction.user.id);
      setTimeout(() => {
        cooldown.delete(interaction.user.id);
      }, cooldownTime);
    } catch (error) {
      logger(error, interaction);
    }
  },
};

/**
 * Check if no response from user
 * @param {ChatInputCommandInteraction} interaction
 */
async function collectorHandler(interaction, slashCommandCategories, locale) {
  const /** @type TextChannel */ textChannel = interaction.channel;
  const collector = textChannel.createMessageComponentCollector({
    time: 60000,
    componentType: ComponentType.StringSelect,
  });

  collector.on("end", async (collected) => {
    if (collected.size === 0) {
      await interaction.editReply({
        components: [
          HelpSelectMenuRowBuilder(slashCommandCategories, locale, true),
        ],
      });
    }
  });
}
