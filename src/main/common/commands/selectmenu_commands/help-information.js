const {
  ComponentType,
  TextChannel,
  StringSelectMenuInteraction,
} = require("discord.js");
const { logger } = require("../../../../common/utils/Utilities");
const { HelpInformationEmbed } = require("../../builders/embeds/help.embed");
const {
  HelpInfoSelectMenuBuilder,
  HelpInfoSelectMenuRowBuilder,
  HelpSelectMenuRowBuilder,
} = require("../../builders/help.builder");

module.exports = {
  data: HelpInfoSelectMenuBuilder(),

  /**
   * @param {StringSelectMenuInteraction} interaction
   */
  execute: async (
    interaction,
    { slashCommandCategories, slashCommandInformation }
  ) => {
    try {
      const locale = interaction.locale;
      await collectorHandler(interaction, slashCommandCategories, locale);

      await interaction.update({
        embeds: [
          HelpInformationEmbed(
            slashCommandInformation.get(
              slashCommandCategories[interaction.extraData].commands[
                interaction.values[0]
              ].name
            ),
            locale,
            interaction.client.user
          ),
        ],
        components: [
          HelpSelectMenuRowBuilder(
            slashCommandCategories,
            locale,
            false,
            interaction.extraData
          ),
          HelpInfoSelectMenuRowBuilder(
            slashCommandCategories[interaction.extraData].commands,
            locale,
            false,
            interaction.extraData,
            interaction.values[0]
          ),
        ],
      });
    } catch (error) {
      logger(error, interaction);
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
            interaction.extraData
          ),
          HelpInfoSelectMenuRowBuilder(
            slashCommandCategories[interaction.extraData].commands,
            locale,
            true,
            interaction.extraData,
            interaction.values[0]
          ),
        ],
      });
    }
  });
}
