const { ActionRowBuilder } = require("discord.js");
const QueueBuilder = require("./queue.builder");

module.exports = {
  queueRowBuilder: async (page, maxPage) => {
    const row = new ActionRowBuilder()
      .addComponents(QueueBuilder.previousPageButtonBuilder(page))
      .addComponents(QueueBuilder.nextPageButtonBuilder(page, maxPage));
    return row;
  },
};
