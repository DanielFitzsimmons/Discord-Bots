const { SlashCommandBuilder } = require("@discordjs/builders");
const axios = require('axios')
const { EmbedBuilder } = require('discord.js');

async function getInsult() {
	try {
		const insult = await axios.get('https://evilinsult.com/generate_insult.php?lang=en&type=json')
		return insult
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName("insult")
		.setDescription("This will get a random insult")
		.addStringOption((option) =>
			option
				.setName("name")
				.setDescription("Insert the name of the persons you would like to insult 🤬")
				.setRequired(true)
		),
	async execute(interaction) {
		console.log(interaction.options.getString('name')); //gets input
		const insult = await getInsult()
		const contentEmbed = new EmbedBuilder()
		contentEmbed.setTitle(interaction.options.getString('name') + " " + insult.data.insult.toLowerCase());
		contentEmbed.setColor(0xFFA500);
		console.log(insult);
		await interaction.reply({ embeds: [contentEmbed] });
	},
};
