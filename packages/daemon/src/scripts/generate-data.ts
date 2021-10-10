import '../env';
import _ from 'lodash';
import faker from 'faker/locale/en';

import {
  initVeramo,
  createDaoProfileVc,
  createPunkProfileVc,
  createKudosVc,
  createSecondedKudosVc
} from '../veramo/did-manager';

// Demo content randomization params
const NumRandomPunks = 100;
const NumRandomKudos = 100;
const NumRandomSecondedKudos = 100;

const daoDiscordIds: string[] = [];
const punkDiscordIds: string[] = [];
const kudosIds: string[] = [];
const _discId = (name:string) => _.snakeCase(name);
const _getRandom = (col:string[]) => col[Math.floor(Math.random()*col.length)]
const _getRandomDao = () => _getRandom(daoDiscordIds);
const _getRandomPunk = () => _getRandom(punkDiscordIds);
const _getRandomKudos = () => _getRandom(kudosIds);

const createDaoProfile = async (params: {name:string, blurb:string, avatarUrl:string}) => {
  const { name, ...rest } = params;
  const discordId = _discId(name);
  await createDaoProfileVc(discordId, {
    name,
    discordId,
    ...rest,
  });
  daoDiscordIds.push(discordId);
  return discordId;
}
const createPunkProfile = async (params: {name:string, handle:string, blurb?:string, avatarUrl:string}) => {
  const { name, handle, ...rest } = params;
  const discordId = _discId(name);
  await createPunkProfileVc(discordId, {
    name,
    handle,
    discordId,
    ...rest,
  });
  punkDiscordIds.push(discordId);
  return discordId;
}
const createKudos = async (punk1:string, punk2:string, dao:string) => {
  const kudosVc = await createKudosVc(punk1, punk2, dao, {
    message: faker.hacker.phrase(),
    description: faker.hacker.phrase(),
    channel: `#${faker.hacker.verb()}-${faker.hacker.noun()}`,
  });
  const credId = kudosVc.credentialSubject.credentialId;
  kudosIds.push(credId);
  return credId;
}

const main = async () => {
  await initVeramo(); // creates Daemon service DID if none exists

  // =========== Hand-Crafted Content =============
  const ashDiscordId = await createDaoProfile({
    name: 'Ash',
    blurb: '$ASH is a social currency backed by curated extinction. The value, the utility and the identity of $ASH is balanced by its users',
    avatarUrl: 'https://tmnt-storage-development.s3.us-east-2.amazonaws.com/ethonline2021/01_Ash.jpg',
  });
  const banklessDiscordId = await createDaoProfile({
    name: 'Bankless DAO',
    blurb: 'Bankless DAO is a decentralized community focused on driving adoption and awareness in bankless money systems like Ethereum, Bitcoin, and DeFi.',
    avatarUrl: 'https://tmnt-storage-development.s3.us-east-2.amazonaws.com/ethonline2021/02_BanklessDAO.jpg',
  });
  await createDaoProfile({
    name: 'DAOhaus',
    blurb: 'DAOhaus is a platform built by the people, for the people. At its core, DAOhaus looks to empower anyone adding value to the DAOhaus ecosystem, regardless of their social status or previous accolades.',
    avatarUrl: 'https://tmnt-storage-development.s3.us-east-2.amazonaws.com/ethonline2021/03_DAOhaus.jpg',
  });
  await createDaoProfile({
    name: 'DXdao',
    blurb: 'DXdao aims to bring decentralization to DeFi and build resilient financial services for the world.',
    avatarUrl: 'https://tmnt-storage-development.s3.us-east-2.amazonaws.com/ethonline2021/04_DXdao.jpg',
  });
  await createDaoProfile({
    name: 'Friends With Benefits',
    blurb: 'Friends with Benefits is the ultimate cultural membership powered by a community of our favorite Web3 artists, operators, and thinkers bound together by shared values and shared incentives ($FWB).',
    avatarUrl: 'https://tmnt-storage-development.s3.us-east-2.amazonaws.com/ethonline2021/05_Friends_With_Benefits.jpg',
  });
  await createDaoProfile({
    name: 'Global Coin Research',
    blurb: 'Global Coin Research is a social currency (cryptocurrency) for the Global Coin Research community of readers, writers, investors and community members.',
    avatarUrl: 'https://tmnt-storage-development.s3.us-east-2.amazonaws.com/ethonline2021/06_Global_Coin_Research.jpg',
  });
  await createDaoProfile({
    name: 'Loot Project',
    blurb: 'Loot is randomized adventurer gear generated and stored on chain. Stats, images, and other functionality are intentionally omitted for others to interpret. Loot DAO is a community initiative of Loot Project to govern $AGLD.',
    avatarUrl: 'https://tmnt-storage-development.s3.us-east-2.amazonaws.com/ethonline2021/07_Loot_Project.jpg',
  });
  await createDaoProfile({
    name: 'MakerDAO',
    blurb: 'MakerDAO is a platform that aims to redefine venture capital for the masses, by providing scalable technologies and funding support to tokenized startups.',
    avatarUrl: 'https://tmnt-storage-development.s3.us-east-2.amazonaws.com/ethonline2021/08_MakerDAO.jpg',
  });
  await createDaoProfile({
    name: 'MetaGame',
    blurb: 'People at MetaGame are building a hub for those interested in decentralized organizations & applications - to begin with.',
    avatarUrl: 'https://tmnt-storage-development.s3.us-east-2.amazonaws.com/ethonline2021/09_MetaGame.jpg',
  });
  await createDaoProfile({
    name: 'MetaFactory',
    blurb: 'MetaFactory is a community-owned culture studio and marketplace focused on the creation and sale of digi-physical goods that celebrate crypto.',
    avatarUrl: 'https://tmnt-storage-development.s3.us-east-2.amazonaws.com/ethonline2021/10_MetaFactory.jpg',
  });
  await createDaoProfile({
    name: 'Seen Haus',
    blurb: 'Seen Haus is merging the digital and physical worlds through non-fungible tokens (NFT) and tangible product auctions.',
    avatarUrl: 'https://tmnt-storage-development.s3.us-east-2.amazonaws.com/ethonline2021/11_Seen_Haus.jpg',
  });
  await createDaoProfile({
    name: 'Whale',
    blurb: '$WHALE is a  social currency (cryptocurrency) that is backed by tangible and rare Non-Fungible Token (NFT) assets, while embodying scarcity through definitive limited issuance.\n',
    avatarUrl: 'https://tmnt-storage-development.s3.us-east-2.amazonaws.com/ethonline2021/12_Whale.jpg',
  });

  const dao1PunkDiscordId = await createPunkProfile({
    name: 'coolDude',
    handle: 'coolDude#1234',
    avatarUrl: 'https://cdn.discordapp.com/avatars/149991825703305217/8e4ec2c92c4fbe31201631ebc81c6289.png?size=512',
  });
  const dao1Punk2DiscordId = await createPunkProfile({
    name: 'radMan',
    handle: 'radMan#2345',
    avatarUrl: 'https://cdn.discordapp.com/avatars/510489920968589318/9f2fc3dad2d3a2f018b34f593f77cf9e.png?size=512',
  });
  const dao1Punk3DiscordId = await createPunkProfile({
    name: 'intenseIndividual',
    handle: 'intenseIndividual#3456',
    avatarUrl: 'https://cdn.discordapp.com/avatars/510490140758507546/f6af831ef51852741a2f430749dfb3bf.png?size=512',
  });
  const vc1 = await createKudosVc(dao1PunkDiscordId, dao1Punk2DiscordId, banklessDiscordId, {
    message: 'You\'re awesome!',
    description: 'Because you did great on the thing! 👏👏👏',
    channel: '#general',
  });
  const vc2 = await createKudosVc(dao1Punk2DiscordId, dao1PunkDiscordId, banklessDiscordId, {
    message: 'You\'re great!',
    description: 'Cuz you gave me kudos earlier! 🎉🎉',
    channel: '#general',
  });
  await createKudosVc(dao1PunkDiscordId, dao1Punk3DiscordId, banklessDiscordId, {
    message: 'You\'ve been killing it lately!',
    description: 'Awesome work on XYZ',
    channel: '#general',
  });
  await createKudosVc(dao1Punk2DiscordId, dao1Punk3DiscordId, banklessDiscordId, {
    message: 'Thanks for helping with the hackathon',
    description: 'Couldn\'t have done it without you!',
    channel: '#general',
  });
  await createSecondedKudosVc(dao1Punk3DiscordId,
    vc1.credentialSubject.credentialId,
  );
  await createSecondedKudosVc(dao1Punk3DiscordId,
    vc2.credentialSubject.credentialId,
  );


  // =========== Randomized Content =============

  // Now creating random punks to get data volume
  for (let i = 0; i < NumRandomPunks; i++) {
    const rndName = `${faker.hacker.adjective()}${faker.hacker.noun()}`.replace(' ','');
    const rndDiscordHandle = `${rndName}#${Math.floor(Math.random()*10000)}`;
    await createPunkProfile({
      name: rndName,
      handle: rndDiscordHandle,
      avatarUrl: faker.image.avatar(),
    });
  }

  // Now creating random Kudos between random punks within random DAOs..
  for (let i = 0; i < NumRandomKudos; i++) {
    const punk1 = _getRandomPunk();
    const punk2 = _getRandomPunk();
    const dao = _getRandomDao();
    await createKudos(punk1, punk2, dao);
  }

  // No creating random SecondedKudos by random punks for random Kudos..
  for (let i = 0; i < NumRandomSecondedKudos; i++) {
    const punk = _getRandomPunk();
    const kudosId = _getRandomKudos();
    await createSecondedKudosVc(punk, kudosId);
  }

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