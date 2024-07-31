require("dotenv").config();
const {Client, Partials, GatewayIntentBits, Events, Collection} = require("discord.js");
const port = process.env.PORT || 4000;

const token = process.env.TOKEN;
console.log(`Token from .env: ${process.env.TOKEN}`);

const client = new Client({ 
  intents: [GatewayIntentBits.GuildMembers]
});


client.commands = new Collection ();
module.exports.client = client;

client.login(process.env.TOKEN).then(async (e) => {
  require("./Handlers/Commands")(client);
  require("./Handlers/Events") (client);
}).catch (async (err) => {
  console.log(err);
});