// EVENT: Listens (and logs) when ZuraBot is logged into server & ready
module.exports = {
  name: "ready",
	once: true,
	execute(client) {
		console.log(`EVENT - ${client.user.tag} Logged In & Ready!`);
	},
};