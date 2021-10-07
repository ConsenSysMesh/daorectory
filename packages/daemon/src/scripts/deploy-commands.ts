import { config } from 'dotenv';
import path from 'path';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import {
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
} from '@discordjs/builders';

config({
  path: path.resolve('./.env'),
});

const { DISCORD_API_TOKEN, DISCORD_CLIENT_ID } = process.env;

const rest = new REST({ version: '9' }).setToken(DISCORD_API_TOKEN);

const commands = [
  new SlashCommandBuilder()
    .setName('daemon')
    .setDescription('Daemon commands')
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName('kudos')
        .setDescription('Issue kudos')
        .addUserOption(option => option
          .setName('recipient')
          .setDescription('The recipient of the kudos')
          .setRequired(true)
        )
        .addStringOption(option => option
          .setName('message')
          .setDescription('Write a quick thank you note')
          .setRequired(true))
        .addStringOption(option => option
          .setName('regarding')
          .setDescription('Describe the project, event, or any other context around the work done')
          .setRequired(true))
    ),
];

// https://discord.com/api/oauth2/authorize?client_id=890644467235844127&permissions=2147552256&scope=bot%20applications.commands
// 2147552256
// View channels
// Send messages
// Read message history
// Use slash commands

(async () => {
  console.log('Deploying commands');
  await rest.put(
    Routes.applicationCommands(DISCORD_CLIENT_ID),
    { body: commands.map(c => c.toJSON()) },
  );
  console.log('Deployed commands');
})();
