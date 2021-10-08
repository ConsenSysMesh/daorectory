import { Client, Intents } from 'discord.js';

const { DISCORD_API_TOKEN } = process.env;

const discordClient = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
  partials: ['USER', 'GUILD_MEMBER', 'REACTION', 'MESSAGE', 'CHANNEL'],
});

export default discordClient;

discordClient.login(DISCORD_API_TOKEN);
