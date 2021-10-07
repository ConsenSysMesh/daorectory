import discordClient from './discord-client';
import { createDaoDid } from '../veramo/did-manager';

console.log('Starting Daemon Discord bot...');

discordClient.on('ready', async () => {
  console.log('Daemon Discord client is ready to receive commands');

  await Promise.all(discordClient.guilds.cache.map(async (guild) => {
    console.log(`Getting or creating DID for ${guild.name}/${guild.id}`);
    await createDaoDid(guild.id);
  }));
});

discordClient.on('interactionCreate', async (interaction) => {
  if (interaction.isCommand()) {
    switch (interaction.commandName) {
      case 'daemon kudos': {
        break;
      }
      default: {
        await interaction.reply({
          content: 'Unknown interaction',
          ephemeral: true,
        });
      }
    }
  }
});

discordClient.on('guildJoin', async (guild) => {
  // Issue guild DID
  await createDaoDid(guild.id);
});
