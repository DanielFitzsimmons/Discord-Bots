// Import of Discord Classes & instance of class
const fs = require("node:fs");
const path = require("node:path");
const { Client, GatewayIntentBits, Collection } = require("discord.js");
require("dotenv").config();

// Declaration of Discord Client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Attaches commands property to Client instance
client.commands = new Collection();
// FILE SYSTEM DECLARATIONS
// Functions: Routing system to determine whether to call command OR event
const functions = fs
  .readdirSync("./src/functions")
  .filter((file) => file.endsWith(".js"));

// Events & Commands: Provides the contents of the events/commands files as a parameter for handleEvents/handleCommands methods (below)
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

const commandsPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(commandsPath);

// Immediately-Invoked Anonymous Async Arrow Function (IIAAFs): Refactored Dynamic File Retrieval System for Events, Commands & Login
(async () => {
  for (const file of functions) {
    require(`./functions/${file}`)(client, fs, path);
  }
  client.handleEvents(eventFiles, eventsPath);
  client.handleCommands(commandFolders, commandsPath);
  client.login(process.env.DISCORD_TOKEN);
})();
