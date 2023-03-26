const { EmbedBuilder, User } = require("discord.js");

module.exports = {
  /**
   *
   * @param {User} user
   * @returns
   */
  HelpMainMenuEmbed: (user) => {
    const embed = new EmbedBuilder()
      .setAuthor({
        name: user.username,
        iconURL: user.avatarURL(),
      })
      .setTitle("Wuneng - `/help` commands list.")
      .setDescription(
        "Using the __dropdown below__ for more information about each command.\nㅤ"
      )
      .addFields(
        {
          name: "About us:",
          value: "<@!283502903958700032>\n<@!343757042638389249>\nㅤ\nㅤ",
          inline: true,
        },
        {
          name: "Wiki:",
          value: "[Basic Command](https://gitlab.com/quangpao/wuneng-bot)",
          inline: true,
        },
        {
          name: "Our Server:",
          value: "[GAMING](https://discord.gg/UN3Ux98shp)",
          inline: true,
        }
      )
      .setColor("#9c66ff");

    return embed;
  },

  HelpCategoryEmbed: (category, locale, user) => {
    const embed = new EmbedBuilder()
      .setAuthor({
        name: user.username,
        iconURL: user.avatarURL(),
      })
      .setTitle(`**${category.category}** - \`/help\` commands list`)
      .setColor("#9c66ff");

    let description = "ㅤ\n";
    for (const command of category.commands) {
      description = description.concat(
        `\`/${command.name}\` - ${command.description}\n`
      );
    }
    embed.setDescription(description);

    return embed;
  },

  HelpInformationEmbed: (information, locale, user) => {
    const embed = new EmbedBuilder()
      .setAuthor({
        name: user.username,
        iconURL: user.avatarURL(),
      })
      .setTitle(`**\`${information.name}\`** - Command Information`)
      .setDescription(information.description)
      .setColor("#9c66ff");

    return embed;
  },
};
