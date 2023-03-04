const { SlashCommandBuilder, ButtonBuilder } = require("discord.js");
const Emoji = require("../../../common/utils/Emoji");

module.exports = {
  slashBuilder: () => {
    const builder = new SlashCommandBuilder()
      .setName("queue")
      .setDescription("Show the music queue");
    return builder;
  },

  nextPageButtonBuilder: (page = -1, maxPage = 1) => {
    const nextPage = page >= maxPage ? maxPage : page + 1;
    const builder = new ButtonBuilder()
      .setStyle("Primary")
      .setEmoji(Emoji.rightId)
      .setLabel(`ᴘᴀɢᴇ ${nextPage > 0 ? maxPage : 1}`)
      .setDisabled(page >= maxPage);
    if (page === -1) {
      builder.setCustomId(`nextpage`);
    } else {
      builder.setCustomId(`nextpage_${page}`);
    }
    return builder;
  },
  previousPageButtonBuilder: (page = -1) => {
    const previousPage = page <= 1 ? 1 : page - 1;
    const builder = new ButtonBuilder()
      .setStyle("Primary")
      .setEmoji(Emoji.leftId)
      .setLabel(`ᴘᴀɢᴇ ${previousPage}`)
      .setDisabled(page <= 1);
    if (page === -1) {
      builder.setCustomId(`previouspage`);
    } else {
      builder.setCustomId(`previouspage_${page}`);
    }
    return builder;
  },
};
