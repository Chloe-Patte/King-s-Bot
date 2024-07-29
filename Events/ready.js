const { Events } = require("discord.js");
const config = require("../config.json");
const client = require ("../index").client;

module.exports = {
  name: Events.ClientReady,
  once: true,
  /**
   * @param {Client} client
   */
  async execute(client) {
    console.log(`Le bot est en ligne (${client.user.tag})`);
  }
};