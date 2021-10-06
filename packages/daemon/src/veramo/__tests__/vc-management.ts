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
  findPunkDid, createDaoDid, findDaoDid
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

  it('should be able to write a VC and then find it by type', async () => {
    const forDid = await createPunkDid('giverPunk');
    const fromDid = await createPunkDid('receiverPunk');
    const vc = await createKudosVc(
      forDid.alias,
      fromDid.alias,
      {
        description: 'You did great on the thing',
        createdBy: forDid.alias,
      });
    // console.log('Created VC', vc);
    const savedVc = await findVcsForPunk(forDid.alias, VcTypes.Kudos);
    // console.log('Queried VC', vc);
    // expect(savedVc).toBeArray();
    expect(savedVc).toHaveLength(1);
  });
});