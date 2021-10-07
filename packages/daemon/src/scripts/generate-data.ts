import '../env';
import {
  initVeramo,
  createDaoProfileVc,
  createPunkProfileVc,
  createKudosVc,
  getAllDids,
  getAllVcs,
  createSecondedKudosVc
} from '../veramo/did-manager';
import { IIdentifier } from "@veramo/core";
import { UniqueVerifiableCredential } from "@veramo/data-store";

const main = async () => {
  await initVeramo(); // creates Daemon service DID if none exists

  // ======= DAO 1 =======
  const daoName1 = 'Bankless DAO';
  await createDaoProfileVc(daoName1, {
    name: daoName1,
    discordId: 'daoDiscordId1',
    avatarUrl: 'https://www.bankless.community/logo.svg',
  });
  const dao1Punk1 = 'coolDude#1234';
  await createPunkProfileVc(dao1Punk1, {
    name: dao1Punk1,
    discordId: 'punkDiscordId11',
    avatarUrl: 'https://cdn.discordapp.com/avatars/149991825703305217/8e4ec2c92c4fbe31201631ebc81c6289.png?size=64',
  });
  const dao1Punk2 = 'radMan#2345';
  await createPunkProfileVc(dao1Punk2, {
    name: dao1Punk2,
    discordId: 'punkDiscordId12',
    avatarUrl: 'https://cdn.discordapp.com/avatars/510489920968589318/9f2fc3dad2d3a2f018b34f593f77cf9e.png?size=64',
  });
  const dao1Punk3 = 'intenseIndividual#3456';
  await createPunkProfileVc(dao1Punk2, {
    name: dao1Punk3,
    discordId: 'punkDiscordId13',
    avatarUrl: 'https://cdn.discordapp.com/avatars/510490140758507546/f6af831ef51852741a2f430749dfb3bf.png?size=64',
  });
  const vc1 = await createKudosVc(dao1Punk1, dao1Punk2, daoName1, {
    message: 'You\'re awesome!',
    description: 'Because you did great on the thing! 👏👏👏',
  });
  const vc2 = await createKudosVc(dao1Punk2, dao1Punk1, daoName1, {
    message: 'You\'re great!',
    description: 'Cuz you gave me kudos earlier! 🎉🎉',
  });
  await createKudosVc(dao1Punk1, dao1Punk3, daoName1, {
    message: 'You\'ve been killing it lately!',
    description: 'Awesome work on XYZ',
  });
  await createKudosVc(dao1Punk2, dao1Punk3, daoName1, {
    message: 'Thanks for helping with the hackathon',
    description: 'Couldn\'t have done it without you!',
  });
  await createSecondedKudosVc(dao1Punk3,
    vc1.credentialSubject.credentialId,
  );
  await createSecondedKudosVc(dao1Punk3,
    vc2.credentialSubject.credentialId,
  );

  // TODO: add good looking data to test UI with

  // ======= DAO 2 =======


  // await _debugPrints();
};

// const _debugPrints = async () => {
//   // just some logic to demonstrate that Veramo data store works
//   const identifiers = await getAllDids();
//   console.log(`There are ${identifiers.length} identifiers`);
//   identifiers.forEach((id: IIdentifier) => {
//     console.log(id);
//   });
//   const vcs = await getAllVcs();
//   console.log(`There are ${vcs.length} VCs`);
//   vcs.forEach((vc: UniqueVerifiableCredential) => {
//     console.log(vc);
//   });
// }

main().catch(console.error);