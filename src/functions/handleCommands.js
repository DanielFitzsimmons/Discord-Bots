const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

// FUNCTION: Dynamic route to command, based on command name
module.exports = (client, fs, path) => {
  client.handleCommands = async (commandFolders, commandsPath) => {
    client.commandArray = [];

    // For-Of Loop for SubFolders
    console.log(commandFolders);
    for (const folder of commandFolders) {
      if (folder == '.DS_Store') continue
      const folderPath = path.join(commandsPath, folder);

      const commandFiles = fs
        .readdirSync(folderPath)
        .filter((file) => file.endsWith(".js"));

      // For-Of Loop for Files (standard)
      for (const file of commandFiles) {
        const filePath = path.join(commandsPath, folder, file);
        const command = require(filePath);

        // With array of Command Files, loop over & dynamically set commands to client.commands Collection (key as command name & value as exported module)
        client.commands.set(command.data.name, command);
        // Same as above, but pushing the JSON data for each command to commandArray
        client.commandArray.push(command.data.toJSON());
      }
    }

    // Set API Auth
    const rest = new REST({ version: "9" }).setToken(process.env.DISCORD_TOKEN);

    // Push Slash Commands to API
    (async () => {
      try {
        console.log("Started refreshing application (/) commands.");

        await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
          body: client.commandArray,
        });

        console.log("Successfully reloaded application (/) commands.");
      } catch (error) {
        console.error(error);
      }
    })();
  };
};
