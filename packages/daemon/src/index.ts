import { config } from 'dotenv';
import path from 'path';
import discordClient from './discord/discord-client';

config({
  path: path.resolve('./.env'),
});

console.log('Starting Daemon...');

discordClient.on('interactionCreate', async (interaction) => {
  if (interaction.isCommand()) {
    await interaction.reply({
      content: 'You have commanded me',
      ephemeral: true,
    });
  }
});
