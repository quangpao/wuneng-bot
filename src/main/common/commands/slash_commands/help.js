const {
  ChatInputCommandInteraction,
  ComponentType,
  TextChannel,
} = require("discord.js");
const { logger } = require("../../../../common/utils/Utilities");
const { HelpMainMenuEmbed } = require("../../builders/embeds/help.embed");
const {
  HelpSlashBuilder,
  HelpSelectMenuRowBuilder,
} = require("../../builders/help.builder");

module.exports = {
  info: {
    name: "help",
    description: "Show all commands",
  },

  data: HelpSlashBuilder(),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  execute: async (interaction, { slashCommandCategories }) => {
    try {
      const locale = interaction.locale;
      await collectorHandler(interaction, slashCommandCategories, locale);

      await interaction.reply({
        embeds: [HelpMainMenuEmbed(interaction.client.user)],
        components: [HelpSelectMenuRowBuilder(slashCommandCategories, locale)],
      });
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
