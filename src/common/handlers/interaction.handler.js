/* eslint-disable no-unused-vars */
const {
  ButtonInteraction,
  ChatInputCommandInteraction,
  Interaction,
} = require("discord.js");
const WNClient = require("../classes/WNClient");

/**
 * @param {ChatInputCommandInteraction} interaction
 * @param {WNClient} client
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
 * @param {WNClient} client
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
   * @param {WNClient} client
   */
  interactionHandler: async (interaction, client) => {
    if (interaction.isButton()) {
      buttonHandler(interaction, client);
    } else if (interaction.isChatInputCommand()) {
      slashCommandHandler(interaction, client);
    }
  },
};
