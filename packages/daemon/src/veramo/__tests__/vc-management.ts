// import { describe, it, xit, beforeAll, afterAll, expect } from '@types/jest';
// import 'jest-extended';
import {
  initVeramo,
  _clearVeramo,
  findDaemonDid,
  createPunkDid,
  findDidByAlias,
  createKudosVc,
  findVcsForPunk,
  findPunkDid, createDaoDid, findDaoDid, findVcsForDid
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
    const newDid = await createPunkDid('fooPunk');
    const savedDid = await findPunkDid('fooPunk');
    expect(savedDid).not.toBeNil();
  });

  it('should be able to create a new DAO DID and find it', async () => {
    const newDid = await createDaoDid('fooDao');
    const savedDid = await findDaoDid('fooDao');
    expect(savedDid).not.toBeNil();
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
        description: 'You did great on the thing',
        createdBy: 'giverPunk',
        discordServer: 'vcDao',
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
    expect(credentialSubject.description).toEqual('You did great on the thing');

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
        description: 'You did great on the thing2',
        createdBy: 'giverPunk2',
        discordServer: 'vcDao2',
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
    expect(credentialSubject.description).toEqual('You did great on the thing2');
  });

  it('should be able to write a VC for non-existent punks and then find it by recipient did', async () => {
    const daoDid = await createDaoDid('vcDao3');
   const vc = await createKudosVc(
      'receiverPunk3',
      'giverPunk3',
     'vcDao3',
      {
        description: 'You did great on the thing3',
        createdBy: 'giverPunk3',
        discordServer: 'vcDao3',
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
    expect(credentialSubject.description).toEqual('You did great on the thing3');
  });
});