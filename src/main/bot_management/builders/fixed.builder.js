const { ActionRowBuilder } = require("@discordjs/builders");
const {
  StringSelectMenuBuilder,
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

  FixedModalBuilder: (id = undefined) => {
    const modal = new ModalBuilder().setTitle("Resolve issue information");

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

    if (id) {
      modal.setCustomId(`fixed-modal ${id}`);
    } else {
      modal.setCustomId(`fixed-modal`);
    }

    return modal;
  },
};

function createFixedBuilder(id = undefined) {
  const builder = new StringSelectMenuBuilder()
    .setMinValues(1)
    .setMaxValues(1)
    .setPlaceholder(`Update issue status`)
    .addOptions([
      {
        label: "Verified",
        description: `Mark the issue as verified (close it as done).`,
        value: "verified",
      },
      {
        label: "Reopen",
        description: `Mark the issue as reopen, assign it again to developer.`,
        value: "reopen",
      },
    ]);

  if (id) {
    builder.setCustomId(`fixed ${id}`);
  } else {
    builder.setCustomId(`fixed`);
  }

  return builder;
}
