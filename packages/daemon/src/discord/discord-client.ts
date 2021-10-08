import { Client, Intents } from 'discord.js';

const { DISCORD_API_TOKEN } = process.env;

const discordClient = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.DIRECT_MESSAGES],
  partials: ['USER', 'GUILD_MEMBER', 'REACTION'],
});

export default discordClient;

discordClient.login(DISCORD_API_TOKEN);
