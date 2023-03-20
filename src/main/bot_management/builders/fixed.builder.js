const {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  Message,
  EmbedBuilder,
} = require("discord.js");
const Color = require("../../../common/utils/Color");

module.exports = {
  /**
   *
   * @param {Message} message
   * @param {String} timeEffort
   * @param {String} mergeRequest
   */
  FixedEmbedBuilder: (message, user, timeEffort, mergeRequest) => {
    const messageEmbed = message.embeds[0];
    const embed = new EmbedBuilder()
      .setTitle("🚫[Fixed] The issue has been fixed")
      .setDescription(
        "The error has been fixed.\nIt is pending to be verified now.\nㅤ"
      )
      .addFields(
        {
          name: messageEmbed.fields[0].name,
          value: messageEmbed.fields[0].value,
        },
        {
          name: messageEmbed.fields[1].name,
          value: messageEmbed.fields[1].value,
          inline: true,
        },
        {
          name: messageEmbed.fields[2].name,
          value: messageEmbed.fields[2].value,
          inline: true,
        },
        {
          name: messageEmbed.fields[3].name,
          value: "`FIXED`\nㅤ",
          inline: true,
        },
        {
          name: "Merge Request:",
          value: `Merge request: [Merge](${mergeRequest})\nTime effort: ${timeEffort}h`,
          inline: true,
        }
      )
      .setThumbnail(
        "https://media.tenor.com/fzCt8ROqlngAAAAM/error-error404.gif"
      )
      .setColor(Color.ERROR.LIGHT)
      .setFooter({
        text: `Fixed by ${user.username}`,
        iconURL: user.displayAvatarURL(),
      })
      .setTimestamp();
    return embed;
  },

  FixedModalBuilder: () => {
    const modal = new ModalBuilder()
      .setTitle("Resolve issue information")
      .setCustomId(`fixed-modal`);

    const timeEffort = new TextInputBuilder()
      .setCustomId("time-effort")
      .setLabel("Time resolving effort:")
      .setPlaceholder("How long did you spend on resolving this issue?")
      .setStyle(TextInputStyle.Short);

    const mergeRequest = new TextInputBuilder()
      .setCustomId("merge-request")
      .setLabel("Merge request:")
      .setPlaceholder("Link to merge request")
      .setRequired(true)
      .setStyle(TextInputStyle.Short);

    const firstRow = new ActionRowBuilder().addComponents(timeEffort);
    const secondRow = new ActionRowBuilder().addComponents(mergeRequest);

    modal.addComponents(firstRow, secondRow);

    return modal;
  },
};
