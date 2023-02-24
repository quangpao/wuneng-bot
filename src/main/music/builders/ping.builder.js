const { SlashCommandBuilder } = require("discord.js")

module.exports = {
  PingSlashCommandBuilder: () => {
    const builder = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong!")
    return builder
  }
}