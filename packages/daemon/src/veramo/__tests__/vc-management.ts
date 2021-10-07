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
  createSecondedKudosVc
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
        discordId: 'discord2',
        avatarUrl: 'something something',
      });
    const savedVcs = await findVcsForDao('fooDao2', VcTypes.DaoProfile);
    expect(savedVcs).toHaveLength(1);
    // console.log('Queried VC', savedVcs[0]);
    const { verifiableCredential } = savedVcs[0];
    const { credentialSubject } = verifiableCredential;
    const daemonDid = await findDaemonDid();
    expect(verifiableCredential.issuer.id).toEqual(daemonDid.did);
    expect(credentialSubject.id).toEqual(vc.credentialSubject.id);
    expect(credentialSubject.name).toEqual('Foo Dao Two');
    expect(credentialSubject.discordId).toEqual('discord2');
    expect(credentialSubject.avatarUrl).toEqual('something something');
  });

  it('should be able to create a PunkProfile VC and find it', async () => {
    const vc = await createPunkProfileVc(
      'fooPunk2',
      {
        name: 'Foo Punk Two',
        discordId: 'discord3',
        avatarUrl: 'something something else',
      });
    const savedVcs = await findVcsForPunk('fooPunk2', VcTypes.PunkProfile);
    expect(savedVcs).toHaveLength(1);
    // console.log('Queried VC', savedVcs[0]);
    const { verifiableCredential } = savedVcs[0];
    const { credentialSubject } = verifiableCredential;
    const daemonDid = await findDaemonDid();
    expect(verifiableCredential.issuer.id).toEqual(daemonDid.did);
    expect(credentialSubject.id).toEqual(vc.credentialSubject.id);
    expect(credentialSubject.name).toEqual('Foo Punk Two');
    expect(credentialSubject.discordId).toEqual('discord3');
    expect(credentialSubject.avatarUrl).toEqual('something something else');
  });

  it('should be able to write a VC for existing punks and then find it by recipient name', async () => {
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
    expect(verifiableCredential.issuer.id).toEqual(fromDid.did);
    expect(credentialSubject.id).toEqual(forDid.did);
    expect(credentialSubject.daoId).toEqual(daoDid.did);
    expect(credentialSubject.message).toEqual('You did great!');
    expect(credentialSubject.description).toEqual('Regarding the thing');

    // console.log(
    //   JSON.stringify(daoDid, null, 2),
    //   JSON.stringify(forDid, null, 2),
    //   JSON.stringify(savedVcs, null, 2),
    //   );
  });

  it('should be able to write a VC for non-existent punks and then find it by recipient name', async () => {
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
    expect(credentialSubject.daoId).toEqual(daoDid.did);
    expect(credentialSubject.message).toEqual('You did great!2');
    expect(credentialSubject.description).toEqual('Regarding the thing2');
  });

  it('should be able to write a VC for non-existent punks and then find it by recipient did', async () => {
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
    expect(credentialSubject.daoId).toEqual(daoDid.did);
    expect(credentialSubject.message).toEqual('You did great!3');
    expect(credentialSubject.description).toEqual('Regarding the thing3');
  });

  it('should be able to write a SecondedKudos VC for non-existent punks and then find it by recipient did', async () => {
    const daoDid = await createDaoDid('vcDao4');
    const kudos = await createKudosVc(
      'receiverPunk4',
      'giverPunk4',
      'vcDao4',
      {
        message: 'You did great!4',
        description: 'Regarding the thing4',
      });
    const secondKudos = await createSecondedKudosVc(
      'receiverPunk4',
      'giverPunk5',
      'vcDao4',
      {
        originalKudosId: kudos.credentialSubject.credentialId,
      });
    // console.log('Created VC', kudos);
    const savedVcs = await findVcsForDid(secondKudos.credentialSubject.id, VcTypes.SecondedKudos);
    expect(savedVcs).toHaveLength(1);
    // console.log('Queried VC', savedVcs[0]);
    const { verifiableCredential } = savedVcs[0];
    const { credentialSubject } = verifiableCredential;
    expect(verifiableCredential.issuer.id).not.toBeNil();
    expect(credentialSubject.id).not.toBeNil();
    expect(credentialSubject.daoId).toEqual(daoDid.did);
    expect(credentialSubject.originalKudosId).toEqual(kudos.credentialSubject.credentialId);
  });
});