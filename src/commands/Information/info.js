const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("info")
		.setDescription("Get ZuraBot to spit out User or Server info!")
    // User info (& option for info on TARGET user)
    .addSubcommand(subcommand => 
      subcommand
        .setName("user")
        .setDescription("Info on a user")
        .addUserOption(option => option
          .setName("target")
          .setDescription("The user")
        ),
    )
    // Server info
    .addSubcommand(subcommand => 
      subcommand
        .setName("server")
        .setDescription("Info about the server")
    ),

	async execute(interaction) {
    // Declare variable for CommandInteractionOptionResolver method: https://discord.js.org/#/docs/discord.js/stable/class/CommandInteractionOptionResolver?scrollTo=getSubcommand)
    const subcommand = interaction.options.getSubcommand();
    console.log(`Info SubCommand: ${subcommand}`);

    // Response to Discord Client for User Info
    if (subcommand === "user") {
      const user = interaction.options.getUser("target");
      if (user) {
        await interaction.reply(`Username: ${user.username}\nUser ID: ${user.id}`);
      } else {
        await interaction.reply(`Username: ${interaction.user.username}\nYour ID: ${interaction.user.id}`);
      }

    // Response to Discord Client for Server Info
    } else if (subcommand === "server") {
      await interaction.reply(`Server name: ${interaction.guild.name}\nServer creation: ${interaction.guild.createdAt}\nTotal members: ${interaction.guild.memberCount}`);
    }
	},
};