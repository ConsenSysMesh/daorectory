import './env';
// import discordClient from './discord/discord-client';
import { init, agent } from './veramo/setup'

console.log('Starting Daemon...');

// TODO: commented out discord stuff for now since it was blowing up on start
// discordClient.on('interactionCreate', async (interaction) => {
//   if (interaction.isCommand()) {
//     await interaction.reply({
//       content: 'You have commanded me',
//       ephemeral: true,
//     });
//   }
// });

const main = async () => {
  await init();
  const identifiers = await agent.didManagerFind()
  console.log(`There are ${identifiers.length} identifiers`)
  identifiers.forEach((id) => {
    console.log(id);
  });
}

main().catch(console.error)