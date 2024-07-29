// Commands/bookSumary.js
const { SlashCommandBuilder, CommandInteraction, Client } = require("discord.js");
const axios = require('axios');
const { incrementBookSummaryCount, getBookSummaryCount } = require('../utils/mongodb');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("booksummary")
    .setDescription("Obtenez le résumé d'un livre de Stephen King par son titre")
    .addStringOption(option => 
      option.setName('title')
        .setDescription('Le titre du livre')
        .setRequired(true)),
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const title = interaction.options.getString('title').toLowerCase();
    const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
    const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(title)}+inauthor:Stephen+King&key=${apiKey}&langRestrict=fr`;

    try {
      console.log('Deferring reply...');
      await interaction.deferReply({ ephemeral: true });
      console.log('Reply deferred successfully.');

      console.log('Fetching book data...');
      const response = await axios.get(url);
      const books = response.data.items;

      if (!books || books.length === 0) {
        console.log('No books found.');
        await interaction.editReply({ content: `Aucun résumé trouvé pour le livre intitulé "${title}".` });
        return;
      }

      // Filtrer les livres en français avec un titre exact et un résumé en français
      const frenchBooks = books.filter(book => {
        const volumeInfo = book.volumeInfo;
        return volumeInfo.language === 'fr' && volumeInfo.description && volumeInfo.title.toLowerCase() === title;
      });

      if (frenchBooks.length === 0) {
        console.log('No French summary found.');
        await interaction.editReply({ content: `Aucun résumé en français trouvé pour le livre intitulé "${title}".` });
        return;
      }

      const book = frenchBooks[0].volumeInfo;
      let summary = book.description;

      // Truncate the summary if it exceeds 2000 characters
      if (summary.length > 1950) {
        summary = summary.substring(0, 1950) + '...';
      }

      const content = `**${book.title}** par Stephen King\n\n${summary}`;

      // Increment the book summary count and get the updated count
      await incrementBookSummaryCount(title);
      const count = await getBookSummaryCount(title);

      console.log('Book found, sending summary...');
      await interaction.editReply({ content: `${content}\n\nCe résumé a été consulté ${count} fois.` });
    } catch (error) {
      console.error('Error occurred:', error);

      // Assurez-vous de ne pas essayer de répondre deux fois
      try {
        if (interaction.deferred || interaction.replied) {
          await interaction.editReply({ content: `Une erreur est survenue lors de la récupération du résumé du livre. Veuillez réessayer plus tard.` });
        } else {
          await interaction.reply({ content: `Une erreur est survenue lors de la récupération du résumé du livre. Veuillez réessayer plus tard.`, ephemeral: true });
        }
      } catch (editError) {
        console.error('Error editing reply:', editError);
      }
    }
  }
};
