const {
  StringSelectMenuBuilder,
  EmbedBuilder,
  Message,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  /**
   *
   * @param {Message} message
   */
  OpenEmbedBuilder: (message) => {
    const messageEmbed = message.embeds[0];
    const embed = new EmbedBuilder()
      .setTitle(`${messageEmbed.title}`)
      .setDescription(`${messageEmbed.description}`)
      .setURL(`${messageEmbed.url}`)
      .setTimestamp()
      .addFields([
        {
          name: `**STATUS**: OPEN`,
          value: `Starting analyzing and working on defect fix.`,
        },
      ]);
    return embed;
  },

  OpenBuilder: () => {
    return createOpenBuilder();
  },

  OpenRowBuilder: (id) => {
    const row = new ActionRowBuilder().addComponents([createOpenBuilder(id)]);
    return row;
  },
};

function createOpenBuilder(id = undefined) {
  const builder = new StringSelectMenuBuilder()
    .setMinValues(1)
    .setMaxValues(1)
    .setPlaceholder(`Update issue status`)
    .addOptions([
      {
        label: "Fixed",
        description: `Mark the issue as fixed (forward it to retest phase).`,
        value: "fixed",
      },
      {
        label: `Transfer`,
        description: `Transfer the bug to other developer.`,
        value: "transfer",
      },
      {
        label: "Deprecated",
        description: `Mark the issue as deprecated (outdated, need to improve).`,
        value: "deprecated",
      },
    ]);

  if (id) {
    builder.setCustomId(`open ${id}`);
  } else {
    builder.setCustomId(`open`);
  }

  return builder;
}
