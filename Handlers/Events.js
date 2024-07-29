const fs = require("fs");
const path = require("path");
const config = require ("../config.json");

module.exports = async (client) => {
  const eventPath = path.join(__dirname, "../Events");
  const eventFiles = fs.readdirSync(eventPath).filter(file => file.endsWith(".js"));

  for (const file of eventFiles) {
    const filePath = path.join(eventPath, file);
    const event = require(filePath);

    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
    } else {
      client.on(event.name, (...args) => event.execute(...args, client));
    }
  }

  console.log(`[${config.AppName}]: All events loaded!`);
};