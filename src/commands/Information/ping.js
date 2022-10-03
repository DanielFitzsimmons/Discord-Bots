const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("ZuraBot Test /SLASH/ Command"),
  async execute(interaction) {
    await interaction.reply("Pong!");
  },
};