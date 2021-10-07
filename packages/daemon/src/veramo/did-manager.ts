import { createVeramoAgent, SERVICE_DID_ALIAS, DID_PROVIDER, KMS } from './index';
import {IDataStore, IDIDManager, IIdentifier, IKeyManager, IResolver, TAgent} from "@veramo/core";
import {IDataStoreORM} from "@veramo/data-store";
import { ICredentialIssuer } from '@veramo/credential-w3c'
import { Connection } from "typeorm";
import {
  VeramoAgentConfigOverrides,
  VcTypes,
  KudoVcSubject,
  DaoProfileVcSubject,
  PunkProfileVcSubject
} from "./veramo-types";
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

const _daoAlias = (name:string) => {
  const lowercaseName = name.toLowerCase();
  return lowercaseName.startsWith('dao_') ? lowercaseName : `dao_${lowercaseName}`;
};
export const createDaoDid = async (name:string) => findOrCreateDid(_daoAlias(name));

const _punkAlias = (name:string) => {
  const lowercaseName = name.toLowerCase();
  return lowercaseName.startsWith('punk_') ? lowercaseName : `punk_${lowercaseName}`;
};
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

/**
 * Creates the profile VC for a DAO. Will create the DAO DID if one does not already exist.
 * @param forDao
 * @param profile
 */
export const createDaoProfileVc = async (forDao:string, profile:DaoProfileVcSubject) => {
  const forDid = await findOrCreateDao(forDao);
  const didVcs = await findVcsForDao(forDao, VcTypes.DaoProfile);
  if (didVcs.length > 0) return didVcs[0];
  const verifiableCredential = await _createVc(
    forDid,
    daemonDid,
    VcTypes.DaoProfile,
    // resolving the DAO's did here based on its name
    profile);
  return verifiableCredential;
};

/**
 * Creates the profile VC for a Punk. Will create the Punk DID if one does not already exist.
 * @param forPunk
 * @param profile
 */
export const createPunkProfileVc = async (forPunk:string, profile:PunkProfileVcSubject) => {
  const forDid = await findOrCreatePunk(forPunk);
  const didVcs = await findVcsForPunk(forPunk, VcTypes.PunkProfile);
  if (didVcs.length > 0) return didVcs[0];
  const verifiableCredential = await _createVc(
    forDid,
    daemonDid,
    VcTypes.PunkProfile,
    // resolving the DAO's did here based on its name
    profile);
  return verifiableCredential;
};

/**
 * Creates a Kudos VC from one punk to another punk DID alias
 * @param forPunk
 * @param fromPunk
 * @param daoName Name of the DAO discord server were the activity took plage
 * @param kudos
 */
export const createKudosVc = async (forPunk:string, fromPunk:string, daoName:string, kudos:KudoVcSubject) => {
  const forDid = await findOrCreatePunk(forPunk);
  const fromDid = await findOrCreatePunk(fromPunk);
  const daoDid = await findDaoDid(daoName);
  const verifiableCredential = await _createVc(
    forDid,
    fromDid,
    VcTypes.Kudos,
    // resolving the DAO's did here based on its name
    {...kudos, daoId: daoDid.did });
  return verifiableCredential;
};

const _createVc = async (forDid:IIdentifier, fromDid:IIdentifier, credentialType:string, credential:object) => {
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

export const findVcsForDao = async (dao: string, vcType: string = VcTypes.Kudos) => {
  const recipientDid = await findDidByAlias(_daoAlias(dao));
  return findVcsForDid(recipientDid.did, vcType);
};

export const findVcsForPunk = async (punk: string, vcType: string = VcTypes.Kudos) => {
  const recipientDid = await findDidByAlias(_punkAlias(punk));
  return findVcsForDid(recipientDid.did, vcType);
};

export const findVcsForDid = async (did: string, vcType: string = VcTypes.Kudos) =>
  agent.dataStoreORMGetVerifiableCredentials({
    where: [
      { column: 'subject', value: [did] },
      { column: 'type', value: [`VerifiableCredential,${vcType}`] },
    ]
  });