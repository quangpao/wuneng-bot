const { EmbedBuilder } = require("discord.js");
const Color = require("../../../../common/utils/Color");

module.exports = {
  /**
   *
   * @param {Message} message
   * @param {User} user
   * @param {string} id
   * @returns
   */
  AssignEmbedBuilder: (message, user) => {
    const messageEmbed = message.embeds[0];
    const embed = new EmbedBuilder()
      .setTitle("🚫[Assign] The issue has been assigned")
      .setDescription(
        "The error has been assigned to a developer.\nIt will be confirmed and fixed at soon at possible.\nㅤ"
      )
      .addFields(
        {
          name: messageEmbed.fields[0].name,
          value: messageEmbed.fields[0].value,
        },
        {
          name: messageEmbed.fields[1].name,
          value: `[${messageEmbed.fields[1].value}](${message.url})`,
          inline: true,
        },
        {
          name: "Assigned to:",
          value: `<@!${user.id}>`,
          inline: true,
        },
        {
          name: "Status:",
          value: "`ASSIGNED`\nㅤ",
          inline: true,
        },
        {
          name: messageEmbed.fields[4].name,
          value: messageEmbed.fields[4].value,
          inline: true,
        }
      )
      .setThumbnail(
        "https://media.tenor.com/fzCt8ROqlngAAAAM/error-error404.gif"
      )
      .setColor(Color.ERROR.LIGHT)
      .setFooter({
        text: `Assigned to ${user.username}`,
        iconURL: user.displayAvatarURL(),
      })
      .setTimestamp();

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
      .setTitle("🚫[Deferred] The issue has been deferred")
      .setDescription(
        "The error has been deferred and added to future plan.\nIt won't be fixed at the moment.\nㅤ"
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
          value: "`DEFERRED`\nㅤ",
          inline: true,
        },
        {
          name: messageEmbed.fields[4].name,
          value: messageEmbed.fields[4].value,
          inline: true,
        }
      )
      .setThumbnail(
        "https://media.tenor.com/fzCt8ROqlngAAAAM/error-error404.gif"
      )
      .setColor(Color.ERROR.LIGHT)
      .setFooter({
        text: `Deferred by ${user.username}`,
        iconURL: user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();
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
      .setTitle("🚫[Duplicated] The issue has been duplicated")
      .setDescription("The error has been removed due to duplicate.\nㅤ")
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
          value: "`DUPLICATED`\nㅤ",
          inline: true,
        },
        {
          name: messageEmbed.fields[4].name,
          value: messageEmbed.fields[4].value,
          inline: true,
        }
      )
      .setThumbnail(
        "https://media.tenor.com/fzCt8ROqlngAAAAM/error-error404.gif"
      )
      .setColor(Color.ERROR.LIGHT)
      .setFooter({
        text: `Removed by ${user.username}`,
        iconURL: user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();
    return embed;
  },
};
