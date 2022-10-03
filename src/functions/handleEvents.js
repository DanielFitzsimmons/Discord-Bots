// FUNCTION: Dynamic route to event, based on event argument
// NOTE: The event handler will automatically retrieve and register NEW event files whenever you restart your bot.

module.exports = (client, fs, path) => {
  client.handleEvents = async (eventFiles, eventsPath) => {
    // For-Of Loop for Files (standard)
    for (const file of eventFiles) {
      const filePath = path.join(eventsPath, file);
      const event = require(filePath);

      // Split of events based on ONE-OFF or RECURRING
      // NOTE: client.once/client.on methods take two arguments - the event name and a callback function
      // ARGS: The callback function takes argument(s) returned by its respective event, collects them in an args array, spreads all event arguments & executes them
      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
      } else {
        client.on(event.name, (...args) => event.execute(...args, client));
      }
    }
  };
};