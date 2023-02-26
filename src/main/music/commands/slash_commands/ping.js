const { ChatInputCommandInteraction } = require("discord.js");
const General = require("../../../../common/builders/General");
const WNClient = require("../../../../common/classes/WNClient");
const emoji = require("../../../../common/utils/Emoji");
const { PingSlashCommandBuilder } = require("../../builders/ping.builder");

module.exports = {
  data: PingSlashCommandBuilder(),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {WNClient} client
   */
  execute: async (interaction, client) => {
    await interaction.reply(`Pong! ${emoji.a0}`);
  },
};
