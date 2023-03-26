const { EmbedBuilder } = require("discord.js");
const Color = require("../../../../common/utils/Color");

module.exports = {
  /**
   *
   * @param {ChatInputCommandInteraction | ButtonInteraction | StringSelectMenuInteraction | MentionableSelectMenuInteraction } interaction
   * @param {Error} error
   * @param {string} id
   * @param {string} suffix
   * @returns
   */
  IssueEmbedBuilder: (interaction, error, id, suffix = undefined) => {
    let command = interaction.customId
      ? interaction.customId
      : `/${interaction.commandName}`;

    const embed = new EmbedBuilder()
      .setTitle(`🚫[Error] An error occurred (\`${command}\`)`)
      .setDescription(
        `An error occurred while executing the command (\`${command}\`).\nThis error will be forwarded directly to <@!283502903958700032>.\n__Be patient until it is fixed__.\nㅤ\nㅤ`
      );

    if (suffix) command = command + " " + suffix;
    embed
      .addFields(
        {
          name: `The command _\`name/customId\`_  that causing the error:`,
          value: `\`${command}\`\nㅤ`,
        },
        {
          name: "Issue Tag:",
          value: `\`${id}\``,
          inline: true,
        },
        {
          name: "Caused by:",
          value: `<@!${interaction.user.id}>`,
          inline: true,
        },
        {
          name: "In Channel:",
          value: `<#${interaction.channelId}>\nㅤ`,
          inline: true,
        },
        {
          name: "Error message:",
          value: error.stack.slice(0, 1024),
          inline: false,
        }
      )
      .setThumbnail(
        "https://media.tenor.com/fzCt8ROqlngAAAAM/error-error404.gif"
      )
      .setColor(Color.ERROR.LIGHT)
      .setFooter({
        text: "Generated by WN",
        iconURL: interaction.client.user.displayAvatarURL(),
      })
      .setTimestamp();

    return embed;
  },
};
