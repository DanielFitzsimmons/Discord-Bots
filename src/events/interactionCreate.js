// EVENT: Listens (and logs) for when user interacts with Discord client with SLASH command
module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (!interaction.isCommand()) return;

    // Fetch command in the Collection with that name and assign it to the variable "command"
    const command = client.commands.get(interaction.commandName);

    // If does NOT exist, return undefined & exit early
    if (!command) return;

    try {
      // IF User Interaction is a KNOWN Command, execute Command Function
      console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an EVENT interaction - Executing Slash Command: ${command.data.name}`);
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  },
};
