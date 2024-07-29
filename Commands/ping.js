const { SlashCommandBuilder, CommandInteraction, Client } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Répond avec Pong!'),
  async execute(interaction, client) {
    await interaction.reply('Pong!');
  },
};
