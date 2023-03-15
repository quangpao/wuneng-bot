const {
  StringSelectMenuBuilder,
  ActionRowBuilder,
  Message,
  EmbedBuilder,
  User,
} = require("discord.js");

module.exports = {
  /**
   *
   * @param {Message} message
   * @param {User} user
   */
  VerifiedEmbedBuilder: (message, user) => {
    const messageEmbed = message.embeds[0];
    const embed = new EmbedBuilder()
      .setTitle(messageEmbed.title)
      .setURL(messageEmbed.url)
      .setDescription(messageEmbed.description)
      .setTimestamp()
      .addFields([
        {
          name: `ㅤ`,
          value: `**Status**: Verified`,
        },
        {
          name: `${messageEmbed.fields[2].value}`,
          value: `${messageEmbed.fields[1].value}`,
        },
      ])
      .setFooter({
        text: `Verified by ${user.username}`,
        iconURL: user.displayAvatarURL({ dynamic: true }),
      });
    return embed;
  },

  ClosedEmbedBuilder: (message, user) => {
    const messageEmbed = message.embeds[0];
    const embed = new EmbedBuilder()
      .setTitle(messageEmbed.title)
      .setURL(messageEmbed.url)
      .setDescription(messageEmbed.description)
      .setTimestamp()
      .addFields([
        {
          name: `ㅤ`,
          value: `**Status**: Closed`,
        },
        {
          name: `${messageEmbed.fields[2].value}`,
          value: `${messageEmbed.fields[1].value}`,
        },
      ])
      .setFooter({
        text: `Closed by ${user.username}`,
        iconURL: user.displayAvatarURL({ dynamic: true }),
      });
    return embed;
  },

  ReviewBuilder: () => {
    return createReviewBuilder();
  },

  ReviewRowBuilder: (id) => {
    const row = new ActionRowBuilder().addComponents([createReviewBuilder(id)]);
    return row;
  },
};

function createReviewBuilder(id = undefined) {
  const builder = new StringSelectMenuBuilder()
    .setMinValues(1)
    .setMaxValues(1)
    .setPlaceholder(`Update review status`)
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
    builder.setCustomId(`review ${id}`);
  } else {
    builder.setCustomId(`review`);
  }

  return builder;
}
