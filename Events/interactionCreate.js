const { BaseInteraction, Events } = require ("discord.js");
const { execute } = require("../Commands/help");
const client = require ("../index").client;

module.exports = {
  name: Events.InteractionCreate,
  /**
   * @param {client} client
   * @param {BaseInteraction} interaction
   */
  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
      interaction.reply({content: `Outdated command`});
      return;
    }

    command.execute(interaction, client);
  }
}