const {
  ChatInputCommandInteraction,
  ComponentType,
  TextChannel,
} = require("discord.js");
const { DisTube } = require("distube");
const Emoji = require("../../../../common/utils/Emoji");
const { logger } = require("../../../../common/utils/Utilities");
const { searchRowBuilder } = require("../../builders/action-row.builder");
const { SearchEmbedBuilder } = require("../../builders/embeds/search.embed");
const { SearchSlashBuilder } = require("../../builders/search.builder");
const { inVoiceChannel } = require("../../utils/permission.check");

module.exports = {
  data: SearchSlashBuilder(),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {{cooldown: Set, cooldownTime: number ,distube: DisTube}}
   */
  execute: async (interaction, { cooldown, cooldownTime, distube }) => {
    if (cooldown.has(interaction.user.id)) {
      await interaction.reply({
        content: `Please wait ${
          cooldownTime / 1000
        } more second(s) before reusing the command.`,
        ephemeral: true,
      });
      return;
    }

    const name = interaction.options.getString("song");

    // Condition check
    if (name.length > 100)
      return await interaction.reply(`${Emoji.stop}Song name to long.`);

    try {
      const songs = await distube.search(name, { limit: 5 });
      const row = await searchRowBuilder(songs);

      await interaction.reply({
        embeds: [SearchEmbedBuilder(songs, interaction.member)],
        components: [row],
      });
      await collectionHandler(interaction);

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
 * Handle search result clicked
 * @param {ChatInputCommandInteraction} interaction
 */
async function collectionHandler(interaction) {
  const /** @type TextChannel */ textChannel = interaction.channel;
  const collector = textChannel.createMessageComponentCollector({
    componentType: ComponentType.Button,
  });
  collector.on("collect", async (i) => {
    if (!(await inVoiceChannel(interaction))) return;
    if (i.customId.split(" ")[0] === "selecttoplay")
      await interaction.deleteReply();
    collector.removeAllListeners("collect");
  });
}
