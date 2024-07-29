// Commands/removeBook.js
const { SlashCommandBuilder } = require('discord.js');
const db = require('../database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('removebook')
    .setDescription('Supprimez un livre de votre bibliothèque personnelle')
    .addStringOption(option => 
      option.setName('title')
        .setDescription('Le titre du livre')
        .setRequired(true)),
  async execute(interaction) {
    const title = interaction.options.getString('title').trim();
    const userId = interaction.user.id;

    try {
      console.log('Début de l\'interaction pour supprimer un livre...');
      await interaction.deferReply({ ephemeral: true });
      console.log('Réponse différée...');

      const normalizeTitle = (str) => str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
      const normalizedInputTitle = normalizeTitle(title.toLowerCase());

      db.run(`DELETE FROM library WHERE user_id = ? AND normalized_title = ?`, [userId, normalizedInputTitle], function(err) {
        if (err) {
          console.error('Erreur lors de la suppression du livre :', err);
          if (interaction.deferred || interaction.replied) {
            return interaction.editReply(`Erreur lors de la suppression du livre : ${err.message}`);
          } else {
            return interaction.reply({ content: `Erreur lors de la suppression du livre : ${err.message}`, ephemeral: true });
          }
        }
        if (this.changes === 0) {
          console.log(`Aucun livre trouvé avec le titre "${title}" pour l'utilisateur ${userId}`);
          if (interaction.deferred || interaction.replied) {
            return interaction.editReply(`Aucun livre trouvé avec le titre "${title}" dans votre bibliothèque.`);
          } else {
            return interaction.reply({ content: `Aucun livre trouvé avec le titre "${title}" dans votre bibliothèque.`, ephemeral: true });
          }
        }
        console.log(`Le livre "${title}" a été supprimé pour l'utilisateur ${userId}`);
        if (interaction.deferred || interaction.replied) {
          return interaction.editReply(`Le livre "${title}" a été supprimé de votre bibliothèque.`);
        } else {
          return interaction.reply({ content: `Le livre "${title}" a été supprimé de votre bibliothèque.`, ephemeral: true });
        }
      });
    } catch (error) {
      console.error('Erreur lors de la suppression du livre :', error);
      try {
        if (interaction.deferred || interaction.replied) {
          await interaction.editReply(`Une erreur est survenue lors de la suppression du livre.`);
        } else {
          await interaction.reply({ content: `Une erreur est survenue lors de la suppression du livre.`, ephemeral: true });
        }
      } catch (responseError) {
        console.error('Erreur lors de la réponse :', responseError);
      }
    }
  },
};

