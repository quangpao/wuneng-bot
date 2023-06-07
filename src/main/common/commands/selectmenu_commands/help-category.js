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
  HelpInfoSelectMenuRowBuilder,
} = require("../../builders/help.builder");

module.exports = {
  data: HelpSelectMenuBuilder(),

  /**
   * @param {StringSelectMenuInteraction} interaction
   */
  execute: async (interaction, { slashCommandCategories }) => {
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
        components: [
          HelpSelectMenuRowBuilder(
            slashCommandCategories,
            locale,
            false,
            interaction.values[0]
          ),
          HelpInfoSelectMenuRowBuilder(
            slashCommandCategories[interaction.values[0]].commands,
            locale,
            false,
            interaction.values[0]
          ),
        ],
      });
    } catch (error) {
      logger(error);
    }
  },
};

/**
 * Check if no response from user
 * @param {StringSelectMenuInteraction} interaction
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
          HelpSelectMenuRowBuilder(
            slashCommandCategories,
            locale,
            true,
            interaction.values[0]
          ),
          HelpInfoSelectMenuRowBuilder(
            slashCommandCategories[interaction.values[0]].commands,
            locale,
            true
          ),
        ],
      });
    }
  });
}
