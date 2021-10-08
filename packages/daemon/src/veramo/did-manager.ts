import { v4 as uuidv4 } from 'uuid';
import { createVeramoAgent, DID_PROVIDER, KMS, SERVICE_DID_ALIAS } from './index';
import {
  IDataStore,
  IDIDManager,
  IIdentifier,
  IKeyManager,
  IResolver,
  TAgent,
  VerifiableCredential,
} from "@veramo/core";
import { IDataStoreORM } from "@veramo/data-store";
import { ICredentialIssuer } from '@veramo/credential-w3c'
import { Connection } from "typeorm";
import type {
  DaoProfileVc,
  KudosVc,
  PunkProfileVc,
  SecondedKudosVc,
  VeramoAgentConfigOverrides,
} from "@sobol/daemon-types/veramo-types";
import fs from "fs";

export enum VcTypes {
  DaoProfile = 'daoProfile',
  PunkProfile = 'punkProfile',
  Kudos = 'kudos',
  SecondedKudos = 'secondedKudos',
}

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

export const getAllDaoVcs = () =>
  agent.dataStoreORMGetVerifiableCredentials({
    where: [
      { column: 'type', value: [`VerifiableCredential,${VcTypes.DaoProfile}`] },
    ],
  });

export const getAllPunkVcs = () =>
  agent.dataStoreORMGetVerifiableCredentials({
    where: [
      { column: 'type', value: [`VerifiableCredential,${VcTypes.PunkProfile}`] },
    ],
  });

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
export const createDaoProfileVc = async (
  forDao: string,
  profile: Omit<DaoProfileVc['credentialSubject'], 'id' | 'credentialId'>,
): Promise<DaoProfileVc> => {
  const forDid = await findOrCreateDao(forDao);
  const didVcs = await findVcsForDao(forDao, VcTypes.DaoProfile);
  if (didVcs.length > 0) return didVcs[0].verifiableCredential as DaoProfileVc;
  return await _createVc<DaoProfileVc>(
    forDid.did,
    daemonId,
    VcTypes.DaoProfile,
    // resolving the DAO's did here based on its name
    profile,
  );
};

/**
 * Creates the profile VC for a Punk. Will create the Punk DID if one does not already exist.
 * @param forPunk
 * @param profile
 */
export const createPunkProfileVc = async (
  forPunk: string,
  profile: Omit<PunkProfileVc['credentialSubject'], 'id' | 'credentialId'>,
): Promise<PunkProfileVc> => {
  const forDid = await findOrCreatePunk(forPunk);
  const didVcs = await findVcsForPunk(forPunk, VcTypes.PunkProfile);
  if (didVcs.length > 0) return didVcs[0].verifiableCredential as PunkProfileVc;
  return await _createVc<PunkProfileVc>(
    forDid.did,
    daemonId,
    VcTypes.PunkProfile,
    // resolving the DAO's did here based on its name
    profile,
  );
};

const vcIsKudos = (vc: VerifiableCredential): vc is KudosVc => vc.type.includes(VcTypes.Kudos);

/**
 * Creates a Kudos VC from one punk to another punk DID alias
 * @param forPunk
 * @param fromPunk
 * @param daoName Name of the DAO discord server where the activity took place
 * @param kudos
 */
export const createKudosVc = async (
  forPunk: string,
  fromPunk: string,
  daoName: string,
  kudos: Omit<KudosVc['credentialSubject'], 'credentialId' | 'id' | 'daoId'>,
): Promise<KudosVc> => {
  const forDid = await findOrCreatePunk(forPunk);
  const fromDid = await findOrCreatePunk(fromPunk);
  const daoDid = await findDaoDid(daoName);
  return await _createVc<KudosVc>(
    forDid.did,
    fromDid.did,
    VcTypes.Kudos,
    // resolving the DAO's did here based on its name
    {
      ...kudos,
      daoId: daoDid.did,
    });
};

export const createSecondedKudosVc = async (fromPunk: string, originalKudosVcId: string): Promise<SecondedKudosVc> => {
  const originalVc = await findVcByCredentialId(originalKudosVcId);
  if (!originalVc || !vcIsKudos(originalVc.verifiableCredential)) {
    throw new Error('Could not find a Kudos VC with that credentialId');
  }
  const { credentialSubject } = originalVc.verifiableCredential;
  const fromDid = await findOrCreatePunk(fromPunk);
  return await _createVc<SecondedKudosVc>(
    credentialSubject.id,
    fromDid.did,
    VcTypes.SecondedKudos,
    // Copying daoId from the original Kudos
    {
      originalKudosId: originalKudosVcId,
      issuerId: fromPunk,
      daoId: credentialSubject.daoId,
    });
};

async function _createVc<VcType extends VerifiableCredential>(
  forDid: string,
  fromDid: string,
  credentialType: string,
  credential: Omit<VcType['credentialSubject'], 'credentialId' | 'id'>,
): Promise<VcType> {
 const vc = await agent.createVerifiableCredential({
    credential: {
      issuer: { id: fromDid },
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiableCredential', credentialType],
      issuanceDate: new Date().toISOString(),
      credentialSubject: {
        ...credential,
        credentialId: uuidv4(),
        id: forDid,
      },
    },
    proofFormat: 'jwt',
    save: true,
  });
 return vc as VcType;
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

export const findVcByCredentialId = async (credentialId: string) => {
  const results = await agent.dataStoreORMGetVerifiableCredentialsByClaims({
    where: [
      { column: 'type', value: ['credentialId'] },
      { column: 'value', value: [credentialId] },
    ]
  });
  return results.length ? results[0] : null;
}

export const findSecondedKudos = async (kudosId: string) => {
  const results = await agent.dataStoreORMGetVerifiableCredentialsByClaims({
    where: [
      { column: 'type', value: ['originalKudosId'] },
      { column: 'value', value: [kudosId] },
    ]
  });
  return results.map(uvc => uvc.verifiableCredential) as SecondedKudosVc[];
}
