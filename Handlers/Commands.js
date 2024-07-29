const { Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // Charger les variables d'environnement

const token = process.env.TOKEN; // Charger le token
const clientId = process.env.CLIENT_ID; // Charger le client ID

console.log(`Client ID from .env: ${clientId}`); // Vérifier le client ID

module.exports = async (client) => {
  let commandArray = [];

  const commandPath = path.join(__dirname, "../Commands");
  const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(commandPath, file);
    const commandFile = require(filePath);

    const properties = { ...commandFile };
    client.commands.set(commandFile.data.name, properties);

    commandArray.push(commandFile.data.toJSON());
  }

  const rest = new REST({ version: "10" }).setToken(token);

  try {
    console.log(`[King's Bot]: started refreshing application (/) commands.`);

    await rest.put(Routes.applicationCommands(clientId), { body: commandArray });

    console.log(`[King's Bot]: ${commandArray.length} commands loaded!`);
  } catch (error) {
    console.log(error);
  }
};
