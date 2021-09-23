import './env';
import discordClient from './discord/discord-client';

console.log('Starting Daemon...');

discordClient.on('interactionCreate', async (interaction) => {
  if (interaction.isCommand()) {
    await interaction.reply({
      content: 'You have commanded me',
      ephemeral: true,
    });
  }
});