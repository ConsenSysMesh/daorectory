// import { describe, it, xit, beforeAll, afterAll, expect } from '@types/jest';
// import 'jest-extended';
import {initVeramo, _clearVeramo, findDaemonDid, createDid, findDidByAlias, createKudosVc, findVcs} from '../did-manager';

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

  it('should be able to create a new DID and find it by its alias', async () => {
    const newDid = await createDid('foo');
    const savedDid = await findDidByAlias('foo');
    expect(savedDid).not.toBeNil();
  });

  it.only('should be able to write a VC and then find it by type', async () => {
    const daemonDid = await findDaemonDid();
    const recipientDid = await createDid('KudosGuy');
    const vc = await createKudosVc(recipientDid.alias, daemonDid.alias, 'You did great on the thing');
    // console.log('Created VC', vc);
    const savedVc = await findVcs(recipientDid.alias, 'kudos');
    // console.log('Queried VC', vc);
    expect(savedVc).toBeArray();
    expect(savedVc).toHaveLength(1);
  });
});