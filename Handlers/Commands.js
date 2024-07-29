const { SlashCommandBuilder, Routes } = require("discord.js");
const { REST } = require("@discordjs/rest");
const fs = require("fs");
const path = require("path");
const config = require("../config.json");

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

  const rest = new REST({ version: "10" }).setToken(process.env.token);

  try {
    console.log(`[${config.AppName}]: started refreshing application (/) commands.`);

    await rest.put(Routes.applicationCommands(config.clientId), { body: commandArray });

    console.log(`[${config.AppName}]: ${commandArray.length} commands loaded!`);
  } catch (error) {
    console.log(error);
  }
};