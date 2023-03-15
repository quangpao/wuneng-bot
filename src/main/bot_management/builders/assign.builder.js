const {
  EmbedBuilder,
  Message,
  User,
  StringSelectMenuBuilder,
  ActionRowBuilder,
} = require("discord.js");
const { INFO } = require("../../../common/utils/Color");

module.exports = {
  /**
   *
   * @param {Message} message
   * @param {User} assigner
   * @param {string} id
   * @returns
   */
  AssignEmbedBuilder: (message, assigner, id) => {
    const embed = new EmbedBuilder()
      .setTitle(`Issue ID: ${id}`)
      .setDescription(`\n**Assign to**: <@${assigner.id}>`)
      .setURL(message.url)
      .setTimestamp()
      .setColor(INFO.DARK);
    return embed;
  },

  /**
   *
   * @param {Message} message
   * @param {User} user
   */
  DeferredEmbedBuilder: (message, user) => {
    const messageEmbed = message.embeds[0];
    const embed = new EmbedBuilder()
      .setTitle(messageEmbed.title)
      .setDescription(messageEmbed.description)
      .setURL(messageEmbed.url)
      .setTimestamp()
      .addFields([
        {
          name: `ㅤ`,
          value: `**Status**: Deferred\nAdded into the development plan.`,
        },
      ])
      .setFooter({
        text: `Deferred set by ${user.username}`,
        iconURL: user.displayAvatarURL({ dynamic: true }),
      });
    return embed;
  },

  /**
   *
   * @param {Message} message
   * @param {User} user
   */
  DuplicatedEmbedBuilder: (message, user) => {
    const messageEmbed = message.embeds[0];
    const embed = new EmbedBuilder()
      .setTitle(messageEmbed.title)
      .setDescription(messageEmbed.description)
      .setURL(messageEmbed.url)
      .setTimestamp()
      .addFields([
        {
          name: `ㅤ`,
          value: `**Status**: Duplicated`,
        },
      ])
      .setFooter({
        text: `Duplicated set by ${user.username}`,
        iconURL: user.displayAvatarURL({ dynamic: true }),
      });
    return embed;
  },

  AssignBuilder: () => {
    return createAssignBuilder();
  },

  AssignRowBuilder: (id) => {
    const row = new ActionRowBuilder().addComponents([createAssignBuilder(id)]);
    return row;
  },
};

function createAssignBuilder(id = undefined) {
  const builder = new StringSelectMenuBuilder()
    .setMinValues(1)
    .setMaxValues(1)
    .setPlaceholder(`Update issue status`)
    .addOptions([
      {
        label: "Open",
        description: `Add the issue to todo-list.`,
        value: "open",
      },
      {
        label: `Deferred`,
        description: `Mark the issue as deferred (won't fix right away).`,
        value: "deferred",
      },
      {
        label: "Duplicated",
        description: `Mark the issue as duplicated (already existed in todo-list)`,
        value: "duplicated",
      },
    ]);

  if (id) {
    builder.setCustomId(`assign ${id}`);
  } else {
    builder.setCustomId(`assign`);
  }

  return builder;
}
