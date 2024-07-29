const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Affiche toutes les commandes disponibles et leurs descriptions'),
  async execute(interaction) {
    const commands = interaction.client.commands.map(command => ({
      name: command.data.name,
      description: command.data.description,
    }));

    let helpMessage = 'Voici les commandes disponibles :\n\n';
    commands.forEach(command => {
      helpMessage += `**/${command.name}**: ${command.description}\n`;
    });

    await interaction.reply({ content: helpMessage, ephemeral: true });
  },
};
