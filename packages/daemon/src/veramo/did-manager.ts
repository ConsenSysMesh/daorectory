import { createVeramoAgent, SERVICE_DID_ALIAS, DID_PROVIDER, KMS } from './index';
import {IDataStore, IDIDManager, IIdentifier, IKeyManager, IResolver, TAgent} from "@veramo/core";
import {IDataStoreORM} from "@veramo/data-store";
import { ICredentialIssuer } from '@veramo/credential-w3c'
import { Connection } from "typeorm";
import {VeramoAgentConfigOverrides, VcTypes, KudoVcSubject} from "./veramo-types";
import fs from "fs";

// requires calling initVeramo to create this local singleton agent and dbConnection
let agent: TAgent<IDIDManager & IKeyManager & IDataStore & IDataStoreORM & IResolver & ICredentialIssuer>;
let dbConnection: Connection;
let dbFile: string;
let daemonDid: IIdentifier;
let daemonId: string;

/**
 * Truing up the local Veramo DID store.
 */
export const initVeramo = async (overrides: VeramoAgentConfigOverrides = null) => {
  dbFile = overrides?.dbFile;
  ({ agent, dbConnection } = (await createVeramoAgent(overrides)));
  // Create our service's DID to sign stuff on our behalf (happens once per environment and is a no-op afterwards).
  daemonDid = await agent.didManagerGetOrCreate({
    alias: SERVICE_DID_ALIAS,
    provider: DID_PROVIDER,
    kms: KMS,
  });
  daemonId = daemonDid.did;
  return agent;
};

/**
 * A utility for integration tests. Don't use in production code!
 */
export const _clearVeramo = async () => {
  try {
    await dbConnection.dropDatabase();
    await dbConnection.close();
    if (dbFile) {
      fs.rmSync(dbFile);
    }
  } catch (e) {
    console.error('Error in _clearVeramo', e);
  }
};

/**
 * Gets all DIDs in the store. Just a debug gimmick.
 */
export const getAllDids = async () => agent.didManagerFind({ provider: DID_PROVIDER });

export const getAllVcs = async () => agent.dataStoreORMGetVerifiableCredentials({});

const _daoAlias = (name:string) => `dao_${name}`;
export const createDaoDid = async (name:string) => findOrCreateDid(_daoAlias(name));

const _punkAlias = (name:string) => `punk_${name}`;
export const createPunkDid = async (name:string) => findOrCreateDid(_punkAlias(name));

export const findOrCreateDid = async (alias:string) =>
  agent.didManagerGetOrCreate({
    alias,
    provider: DID_PROVIDER,
    kms: KMS,
  });

/**
 * Creates a new DID and labels it with the given alias for subsequent lookup.
 * @param alias
 */
export const _createDid = async (alias:string) =>
  agent.didManagerCreate({
    alias,
    provider: DID_PROVIDER,
    kms: KMS,
  });

// export const deleteDid = async (alias:string) =>
//   agent.didManagerDelete({ alias });

export const findDidByAlias = async (alias:string) => {
  const matchedDids = await agent.didManagerFind({ alias, provider: DID_PROVIDER });
  return matchedDids[0];
};

export const findDaemonDid = async () => daemonDid || findDidByAlias(SERVICE_DID_ALIAS);
export const findDaoDid = async (name:string) => findDidByAlias(_daoAlias(name));
export const findPunkDid = async (name:string) => findDidByAlias(_punkAlias(name));
export const findOrCreateDao = async (name:string) => findOrCreateDid(_daoAlias(name));
export const findOrCreatePunk = async (name:string) => findOrCreateDid(_punkAlias(name));

export const createKudosVc = async (forPunk:string, fromPunk:string, kudos:KudoVcSubject) => {
  const forDid = await findOrCreatePunk(forPunk);
  const fromDid = await findOrCreatePunk(fromPunk);
  const verifiableCredential = await _createVc(
    forDid,
    fromDid,
    VcTypes.Kudos,
    kudos);
  return verifiableCredential;
};

const _createVc = async (forDid:IIdentifier, fromDid:IIdentifier, credentialType:string, credential:KudoVcSubject) => {
  // TODO: define some VC schemas
 return agent.createVerifiableCredential({
    credential: {
      issuer: { id: fromDid.did },
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiableCredential', credentialType],
      issuanceDate: new Date().toISOString(),
      credentialSubject: {
        ...credential,
        id: forDid.did,
      },
    },
    proofFormat: 'jwt',
    save: true,
  });
}

export const findVcsForPunk = async (punk: string, vcType: string = VcTypes.Kudos) => {
  const recipientDid = await findDidByAlias(_punkAlias(punk));
  return agent.dataStoreORMGetVerifiableCredentials({
    where: [
      { column: 'subject', value: [recipientDid.did] },
      // { column: 'type', value: ['VerifiableCredential', vcType] },
    ]
  })
};
