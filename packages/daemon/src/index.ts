import './env';
import discordClient from './discord/discord-client';
import { initDids, getAllDids } from './veramo/did-manager';

console.log('Starting Daemon...');

discordClient.on('interactionCreate', async (interaction) => {
  if (interaction.isCommand()) {
    await interaction.reply({
      content: 'You have commanded me',
      ephemeral: true,
    });
  }
});

const main = async () => {
  await initDids(); // creates Daemon service DID if none exists
  // just some logic to demonstrate that Veramo data store works
  const identifiers = await getAllDids();
  console.log(`There are ${identifiers.length} identifiers`);
  identifiers.forEach((id) => {
    console.log(id);
  });
}

main().catch(console.error);