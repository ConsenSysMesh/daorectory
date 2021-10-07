import discordClient from './discord-client';
import {
  createDaoDid,
  createDaoProfileVc,
  createKudosVc,
  createPunkProfileVc,
} from '../veramo/did-manager';
import { userMention } from '@discordjs/builders';
import { GuildMember, MessageEmbed } from 'discord.js';

console.log('Starting Daemon Discord bot...');

discordClient.on('ready', async () => {
  console.log('Daemon Discord client is ready to receive commands');

  await Promise.all(discordClient.guilds.cache.map(async (guild) => {
    console.log(`Getting or creating DID for ${guild.name}/${guild.id}`);
    const vc = await createDaoProfileVc(guild.id, {
      name: guild.name,
      discordId: guild.id,
      avatarUrl: guild.iconURL(),
    });
    console.log(vc);
  }));
  console.log('Finished creating DIDs/VCs for all guilds');
});

discordClient.on('interactionCreate', async (interaction) => {
  if (interaction.isCommand() && interaction.inGuild()) {
    const subcommand = interaction.options.getSubcommand();
    switch ([interaction.commandName, subcommand].join('.')) {
      case 'daemon.kudos': {
        const recipientOption = interaction.options.getUser('recipient');
        const message = interaction.options.getString('message');
        const regarding = interaction.options.getString('regarding');

        const recipient = await interaction.guild.members.fetch(recipientOption.id);

        const from = await interaction.guild.members.fetch(interaction.user.id);

        const recipientVc = await createPunkProfileVc(recipient.id, {
          name: recipient.displayName,
          discordId: recipient.id,
          avatarUrl: recipient.user.displayAvatarURL(),
        });

        const fromVc = await createPunkProfileVc(from.id, {
          name: from.displayName,
          discordId: from.id,
          avatarUrl: from.user.displayAvatarURL(),
        });
        console.log(recipientVc, fromVc);

        const vc = await createKudosVc(recipient.id, interaction.user.id, interaction.guildId, {
          message,
          description: regarding,
          daoId: interaction.guildId,
        });

        console.log('Issued kudos VC:', vc);
        await interaction.reply({
          content: `Kudos! ${userMention(recipient.id)}`,
          embeds: [
            new MessageEmbed()
              .setTitle(message)
              .setDescription(regarding)
              .setThumbnail(recipient.user.avatarURL())
              .addField('From', userMention(interaction.user.id))
              .addField('KudosID', 'No ID currently, sorry eh')
              .setTimestamp(),
          ],
        });
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
