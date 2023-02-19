/* eslint-disable no-unused-vars */
const {
  ButtonInteraction,
  Client,
  ChatInputCommandInteraction,
  Interaction,
} = require("discord.js");

/**
 * @param {ChatInputCommandInteraction} interaction
 * @param {Client} client
 */
const slashCommandHandler = async (interaction, client) => {
  const command = client.slashCommands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction, client);
  } catch (error) {
    console.error(error);
  }
};

/**
 * @param {ButtonInteraction} interaction
 * @param {Client} client
 */
const buttonHandler = async (interaction, client) => {
  const [ customId, extraData ] = interaction.customId.split("_");
  const command = client.buttonCommands.get(customId);
  if (!command) return;
  if (extraData) interaction.extraData = extraData;

  try {
    await command.execute(interaction, client);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  /**
   * @param {Interaction} interaction
   * @param {Client} client
   */
  interactionHandler: async (interaction, client) => {
    if (interaction.isButton()) {
      buttonHandler(interaction, client);
    } else if (interaction.isChatInputCommand()) {
      slashCommandHandler(interaction, client);
    }
  },
};
