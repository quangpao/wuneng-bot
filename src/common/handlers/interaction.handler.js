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
  const [ customId, extraData ] = interaction.customId.split(" ");
  const command = client.buttonCommands.get(customId);
  if (!command) return;
  if (extraData) interaction.extraData = extraData;

  try {
    await command.execute(interaction, client);
  } catch (error) {
    console.error(error);
  }
};

/**
 * @param {import("discord.js").AnySelectMenuInteraction} interaction
 * @param {WNClient} client
 */
const selectmenuHandler = async (interaction, client) => {
  const [ customId, extraData ] = interaction.customId.split(" ");
  const command = client.selectmenuCommands.get(customId);
  if (!command) return;
  if (extraData) interaction.extraData = extraData;

  try {
    await command.execute(interaction, client);
  } catch (error) {
    console.error(error);
  }
};

const modalHandler = async (interaction, client) => {
  const [ customId, extraData ] = interaction.customId.split(" ");
  const command = client.modalCommands.get(customId);
  if (!command) return;
  if (extraData) interaction.extraData = extraData;

  try {
    await command.execute(interaction, client);
  } catch (error) {
    console.error(error);
  }
};

/**
 * @param {Interaction} interaction
 * @param {WNClient} client
 */
const interactionHandler = async (interaction, client) => {
  if (interaction.isButton()) {
    buttonHandler(interaction, client);
  } else if (interaction.isChatInputCommand()) {
    slashCommandHandler(interaction, client);
  } else if (interaction.isAnySelectMenu()) {
    selectmenuHandler(interaction, client);
  } else if (interaction.isModalSubmit()) {
    modalHandler(interaction, client);
  }
};

module.exports = interactionHandler;
