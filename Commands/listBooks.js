// Commands/listBooks.js
const { SlashCommandBuilder } = require('discord.js');
const db = require('../database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('listbooks')
    .setDescription('Liste les livres dans votre bibliothèque personnelle'),
  async execute(interaction) {
    const userId = interaction.user.id;

    try {
      console.log('Début de l\'interaction pour lister les livres...');
      await interaction.deferReply({ ephemeral: true });
      console.log('Réponse différée...');

      db.all(`SELECT book_title, book_authors FROM library WHERE user_id = ?`, [userId], (err, rows) => {
        if (err) {
          console.error('Erreur lors de la récupération des livres :', err);
          return interaction.editReply(`Erreur lors de la récupération de la liste des livres : ${err.message}`);
        }
        if (rows.length === 0) {
          console.log('Aucun livre trouvé dans la bibliothèque de l\'utilisateur');
          return interaction.editReply(`Votre bibliothèque est vide.`);
        }

        const books = rows.map(row => `**${row.book_title}** par ${row.book_authors}`).join('\n');
        interaction.editReply(`Vos livres :\n${books}`);
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des livres :', error);
      try {
        if (interaction.deferred || interaction.replied) {
          await interaction.editReply(`Une erreur est survenue lors de la récupération de la liste des livres.`);
        } else {
          await interaction.reply({ content: `Une erreur est survenue lors de la récupération de la liste des livres.`, ephemeral: true });
        }
      } catch (responseError) {
        console.error('Erreur lors de la réponse :', responseError);
      }
    }
  },
};
