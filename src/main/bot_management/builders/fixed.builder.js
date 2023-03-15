const {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  Message,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  /**
   *
   * @param {Message} message
   * @param {String} timeEffort
   * @param {String} mergeRequest
   */
  FixedEmbedBuilder: (message, timeEffort, mergeRequest) => {
    const messageEmbed = message.embeds[0];
    const embed = new EmbedBuilder()
      .setTitle(`${messageEmbed.title}`)
      .setDescription(`${messageEmbed.description}`)
      .setURL(`${messageEmbed.url}`)
      .setTimestamp()
      .addFields([
        {
          name: `ㅤ`,
          value: `**Status**: Fixed`,
        },
        {
          name: `ㅤ`,
          value: `**Merge Request**: [Link](${mergeRequest})`,
        },
        {
          name: `ㅤ`,
          value: `**Time resolving effort**: ${timeEffort || "N/A"}`,
        },
      ]);
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
