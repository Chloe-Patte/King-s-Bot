const {Client, Partials, GatewayIntentBits, Events, Collection} = require("discord.js");
require("dotenv").config();

const client = new Client({ 
  intents: [GatewayIntentBits.GuildMembers]
});


client.commands = new Collection ();
module.exports.client = client;

client.login(process.env.token).then(async (e) => {
  require("./Handlers/Commands")(client);
  require("./Handlers/Events") (client);
}).catch (async (err) => {
  console.log(err);
});