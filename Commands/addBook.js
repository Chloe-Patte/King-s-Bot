// Commands/addBook.js
const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const db = require('../database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('addbook')
    .setDescription('Ajoutez un livre de Stephen King à votre bibliothèque personnelle en utilisant Google Books')
    .addStringOption(option => 
      option.setName('title')
        .setDescription('Le titre du livre')
        .setRequired(true)),
  async execute(interaction) {
    const title = interaction.options.getString('title').trim();
    const userId = interaction.user.id;
    const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
    const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(title)}+inauthor:Stephen+King&key=${apiKey}`;

    try {
      console.log('Début de l\'interaction pour ajouter un livre...');
      await interaction.deferReply({ ephemeral: true });
      console.log('Réponse différée...');

      const response = await axios.get(url);
      const books = response.data.items;

      if (!books || books.length === 0) {
        console.log(`Aucun livre trouvé pour le titre "${title}"`);
        return interaction.editReply(`Aucun livre de Stephen King trouvé pour le titre "${title}".`);
      }

      const normalizeTitle = (str) => str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
      const normalizedInputTitle = normalizeTitle(title.toLowerCase());

      const book = books.find(book => {
        const volumeInfo = book.volumeInfo;
        if (volumeInfo.authors && volumeInfo.authors.includes('Stephen King')) {
          const bookTitle = normalizeTitle(volumeInfo.title.toLowerCase());
          return bookTitle === normalizedInputTitle;
        }
        return false;
      });

      if (!book) {
        console.log(`Aucun livre de Stephen King trouvé pour le titre "${title}"`);
        return interaction.editReply(`Aucun livre de Stephen King trouvé pour le titre "${title}".`);
      }

      const bookTitle = book.volumeInfo.title; // Conserver le titre original
      const bookAuthors = book.volumeInfo.authors.join(', ');

      console.log(`Ajout du livre "${bookTitle}" par ${bookAuthors} pour l'utilisateur ${userId}`);
      
      db.run(`INSERT INTO library (user_id, book_title, book_authors, normalized_title) VALUES (?, ?, ?, ?)`, [userId, bookTitle, bookAuthors, normalizeTitle(bookTitle)], (err) => {
        if (err) {
          console.error('Erreur lors de l\'ajout du livre :', err);
          return interaction.editReply(`Erreur lors de l'ajout du livre : ${err.message}`);
        }
        interaction.editReply(`Le livre "${bookTitle}" par ${bookAuthors} a été ajouté à votre bibliothèque.`);
      });
    } catch (error) {
      console.error('Erreur lors de l\'ajout du livre :', error);
      try {
        if (interaction.deferred || interaction.replied) {
          await interaction.editReply(`Une erreur est survenue lors de la recherche du livre.`);
        } else {
          await interaction.reply({ content: `Une erreur est survenue lors de la recherche du livre.`, ephemeral: true });
        }
      } catch (responseError) {
        console.error('Erreur lors de la réponse :', responseError);
      }
    }
  },
};
