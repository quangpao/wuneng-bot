const { ChatInputCommandInteraction } = require("discord.js");
const WNClient = require("../../../../common/classes/WNClient");
const { PingSlashCommandBuilder } = require("../../builders/ping.builder");

module.exports = {
  data: PingSlashCommandBuilder(),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {WNClient} client
   */
  execute: async (interaction, client) => {
    await interaction.reply("Pong!");
  }

}