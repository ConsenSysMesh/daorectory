// import { describe, it, xit, beforeAll, afterAll, expect } from '@types/jest';
// import 'jest-extended';
import {
  initVeramo,
  _clearVeramo,
  findDaemonDid,
  createPunkDid,
  createKudosVc,
  findVcsForPunk,
  findPunkDid,
  createDaoDid,
  findDaoDid,
  findVcsForDid,
  createDaoProfileVc,
  findVcsForDao,
  createPunkProfileVc,
  createSecondedKudosVc, findVcByCredentialId
} from '../did-manager';
import {VcTypes} from "../veramo-types";

describe('did-manager', () => {
  let agent = null;

  beforeAll(async () => {
    ({ agent } = await initVeramo({
      dbFile: 'database.test.sqlite',
      veramoSecret: '29739248cad1bd1a0fc4d9b75cd4d2990de535baf5caadfdf8d8f86664aa830c',
      infuraProjectId: '9386bd3e92034b6784bc17ed1d7253f4',
    }));
  });
  afterAll(_clearVeramo);

  it('should create Daemon service did on start', async () => {
    const daemonDid = await findDaemonDid();
    expect(daemonDid).not.toBeNil();
  });

  it('should be able to create a new punk DID and find it', async () => {
    await createPunkDid('fooPunk');
    const savedDid = await findPunkDid('fooPunk');
    expect(savedDid).not.toBeNil();
  });

  it('should be able to create a new DAO DID and find it', async () => {
    await createDaoDid('fooDao');
    const savedDid = await findDaoDid('fooDao');
    expect(savedDid).not.toBeNil();
  });

  it('should be able to create a DaoProfile VC and find it', async () => {
    const vc = await createDaoProfileVc(
      'fooDao2',
      {
        name: 'Foo Dao Two',
        discordId: 'daoDiscord2',
        avatarUrl: 'daoAvatar2',
      });
    const savedVcs = await findVcsForDao('fooDao2', VcTypes.DaoProfile);
    expect(savedVcs).toHaveLength(1);
    // console.log('Queried VC', savedVcs[0]);
    const { verifiableCredential } = savedVcs[0];
    const { credentialSubject } = verifiableCredential;
    const daemonDid = await findDaemonDid();
    expect(credentialSubject.credentialId).not.toBeNil();
    expect(verifiableCredential.issuer.id).toEqual(daemonDid.did);
    expect(credentialSubject.id).toEqual(vc.credentialSubject.id);
    expect(credentialSubject.name).toEqual('Foo Dao Two');
    expect(credentialSubject.discordId).toEqual('daoDiscord2');
    expect(credentialSubject.avatarUrl).toEqual('daoAvatar2');
  });

  it('should not create a new DaoProfile VC if one already exists for the dao name', async () => {
    const vc = await createDaoProfileVc(
      'fooDao3',
      {
        name: 'Foo Dao Tree',
        discordId: 'daoDiscord3',
        avatarUrl: 'daoAvatar3',
      });
    await createDaoProfileVc(
      'fooDao3', // same DAO name ^
      {
        name: 'F23423425sasdf',
        discordId: '23234344',
        avatarUrl: 'ssadfsafd',
      });
    const savedVcs = await findVcsForDao('fooDao3', VcTypes.DaoProfile);
    expect(savedVcs).toHaveLength(1);
    const { verifiableCredential } = savedVcs[0];
    const { credentialSubject } = verifiableCredential;
    expect(credentialSubject.credentialId).toEqual(vc.credentialSubject.credentialId);
    expect(credentialSubject.name).toEqual('Foo Dao Tree');
    expect(credentialSubject.discordId).toEqual('daoDiscord3');
    expect(credentialSubject.avatarUrl).toEqual('daoAvatar3');
  });

  it('should be able to create a PunkProfile VC and find it', async () => {
    const vc = await createPunkProfileVc(
      'fooPunk2',
      {
        name: 'Foo Punk Two',
        discordId: 'punkDiscord2',
        avatarUrl: 'punkAvatar2',
      });
    const savedVcs = await findVcsForPunk('fooPunk2', VcTypes.PunkProfile);
    expect(savedVcs).toHaveLength(1);
    // console.log('Queried VC', savedVcs[0]);
    const { verifiableCredential } = savedVcs[0];
    const { credentialSubject } = verifiableCredential;
    const daemonDid = await findDaemonDid();
    expect(credentialSubject.credentialId).not.toBeNil();
    expect(verifiableCredential.issuer.id).toEqual(daemonDid.did);
    expect(credentialSubject.id).toEqual(vc.credentialSubject.id);
    expect(credentialSubject.name).toEqual('Foo Punk Two');
    expect(credentialSubject.discordId).toEqual('punkDiscord2');
    expect(credentialSubject.avatarUrl).toEqual('punkAvatar2');
  });

  it('should not create a new PunkProfile VC if one already exists for the punk name', async () => {
    const vc = await createPunkProfileVc(
      'fooPunk3',
      {
        name: 'Foo Punk Tree',
        discordId: 'punkDiscord3',
        avatarUrl: 'punkAvatar3',
      });
    await createPunkProfileVc(
      'fooPunk3', // same punk name ^
      {
        name: '123123asdasd23',
        discordId: '3345335',
        avatarUrl: 'gerehhghfg',
      });
    const savedVcs = await findVcsForPunk('fooPunk3', VcTypes.PunkProfile);
    expect(savedVcs).toHaveLength(1);
    const { verifiableCredential } = savedVcs[0];
    const { credentialSubject } = verifiableCredential;
    expect(credentialSubject.credentialId).toEqual(vc.credentialSubject.credentialId);
    expect(credentialSubject.name).toEqual('Foo Punk Tree');
    expect(credentialSubject.discordId).toEqual('punkDiscord3');
    expect(credentialSubject.avatarUrl).toEqual('punkAvatar3');
  });

  it('should be able to create a Kudos VC for existing punks and then find it by recipient name', async () => {
    const daoDid = await createDaoDid('vcDao');
    const forDid = await createPunkDid('receiverPunk');
    const fromDid = await createPunkDid('giverPunk');
    await createKudosVc(
      'receiverPunk',
      'giverPunk',
      'vcDao',
      {
        message: 'You did great!',
        description: 'Regarding the thing',
      });
    // console.log('Created VC', vc);
    const savedVcs = await findVcsForPunk('receiverPunk', VcTypes.Kudos);
    expect(savedVcs).toHaveLength(1);
    // console.log('Queried VC', savedVcs[0]);
    const { verifiableCredential } = savedVcs[0];
    const { credentialSubject } = verifiableCredential;
    expect(credentialSubject.credentialId).not.toBeNil();
    expect(verifiableCredential.issuer.id).toEqual(fromDid.did);
    expect(credentialSubject.id).toEqual(forDid.did);
    expect(credentialSubject.daoId).toEqual(daoDid.did);
    expect(credentialSubject.message).toEqual('You did great!');
    expect(credentialSubject.description).toEqual('Regarding the thing');
  });

  it('should be able to create a Kudos VC for non-existent punks and then find it by recipient name', async () => {
    const daoDid = await createDaoDid('vcDao2');
    await createKudosVc(
      'receiverPunk2',
      'giverPunk2',
      'vcDao2',
      {
        message: 'You did great!2',
        description: 'Regarding the thing2',
      });
    // console.log('Created VC', vc);
    const savedVcs = await findVcsForPunk('receiverPunk2', VcTypes.Kudos);
    expect(savedVcs).toHaveLength(1);
    // console.log('Queried VC', savedVcs[0]);
    const { verifiableCredential } = savedVcs[0];
    const { credentialSubject } = verifiableCredential;
    expect(verifiableCredential.issuer.id).not.toBeNil();
    expect(credentialSubject.id).not.toBeNil();
    expect(credentialSubject.credentialId).not.toBeNil();
    expect(credentialSubject.daoId).toEqual(daoDid.did);
    expect(credentialSubject.message).toEqual('You did great!2');
    expect(credentialSubject.description).toEqual('Regarding the thing2');
  });

  it('should be able to create a Kudos VC for non-existent punks and then find it by recipient did', async () => {
    const daoDid = await createDaoDid('vcDao3');
   const vc = await createKudosVc(
      'receiverPunk3',
      'giverPunk3',
     'vcDao3',
      {
        message: 'You did great!3',
        description: 'Regarding the thing3',
      });
    // console.log('Created VC', vc);
    const savedVcs = await findVcsForDid(vc.credentialSubject.id, VcTypes.Kudos);
    expect(savedVcs).toHaveLength(1);
    // console.log('Queried VC', savedVcs[0]);
    const { verifiableCredential } = savedVcs[0];
    const { credentialSubject } = verifiableCredential;
    expect(verifiableCredential.issuer.id).not.toBeNil();
    expect(credentialSubject.id).not.toBeNil();
    expect(credentialSubject.credentialId).not.toBeNil();
    expect(credentialSubject.daoId).toEqual(daoDid.did);
    expect(credentialSubject.message).toEqual('You did great!3');
    expect(credentialSubject.description).toEqual('Regarding the thing3');
  });

  it('should be able to create a Kudos VC for non-existent punks and then find it by recipient did', async () => {
    const daoDid = await createDaoDid('vcDao4');
    const vc = await createKudosVc(
      'receiverPunk4',
      'giverPunk4',
      'vcDao4',
      {
        message: 'You did great!4',
        description: 'Regarding the thing4',
      });
    // console.log('Created VC', vc);
    const savedVc = await findVcByCredentialId(vc.credentialSubject.credentialId);
    expect(savedVc).not.toBeNil();
    const { verifiableCredential } = savedVc;
    const { credentialSubject } = verifiableCredential;
    expect(verifiableCredential.issuer.id).not.toBeNil();
    expect(credentialSubject.id).not.toBeNil();
    expect(credentialSubject.credentialId).not.toBeNil();
    expect(credentialSubject.daoId).toEqual(daoDid.did);
    expect(credentialSubject.message).toEqual('You did great!4');
    expect(credentialSubject.description).toEqual('Regarding the thing4');
  });

  it('should be able to create a SecondedKudos VC for non-existent punks and then find it by recipient did', async () => {
    const daoDid = await createDaoDid('vcDao5');
    const kudos = await createKudosVc(
      'receiverPunk5',
      'giverPunk5',
      'vcDao5',
      {
        message: 'You did great!5',
        description: 'Regarding the thing5',
      });
    const secondKudos = await createSecondedKudosVc(
      'giverPunk6',
      kudos.credentialSubject.credentialId);

    // console.log('Created VC', kudos);
    const savedVcs = await findVcsForDid(secondKudos.credentialSubject.id, VcTypes.SecondedKudos);
    expect(savedVcs).toHaveLength(1);
    // console.log('Queried VC', savedVcs[0]);
    const { verifiableCredential } = savedVcs[0];
    const { credentialSubject } = verifiableCredential;
    expect(verifiableCredential.issuer.id).not.toBeNil();
    expect(credentialSubject.id).not.toBeNil();
    expect(credentialSubject.credentialId).not.toBeNil();
    expect(credentialSubject.daoId).toEqual(daoDid.did);
    expect(credentialSubject.originalKudosId).toEqual(kudos.credentialSubject.credentialId);
  });
});