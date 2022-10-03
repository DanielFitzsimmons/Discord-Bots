const { SlashCommandBuilder } = require("@discordjs/builders");
const axios = require('axios')
const { EmbedBuilder } = require('discord.js');

async function getColours(colour) {
	try {
		//console.log(colour);
		let hex = colour.split(/(..)/g).filter(s => s);
		//console.log(hex);
		const config = {
			model: "default",
			input: [[44, 43, 44], "N", "N", "N", "N"]
		}
		colourCollection = await axios.post('http://colormind.io/api/', JSON.stringify(config))
		console.log(colourCollection.data);
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName("colour")
		.setDescription("This will get a new colour")
		.addStringOption((option) =>
			option
				.setName("hexvalue")
				.setDescription("Insert a hex value")
				.setRequired(true)
		),
	async execute(interaction) {
		//console.log(interaction.options.getString('hexvalue'));
		getColours(interaction.options.getString('hexvalue'))
		console.log(EmbedBuilder);
		const exampleEmbed = new EmbedBuilder().setTitle('Some title');
		exampleEmbed.setColor(0xb91c1c);
		//interaction.send({ embeds: [exampleEmbed] });
		await interaction.reply({ embeds: [exampleEmbed] });
	},
};
