import { createVeramoAgent, SERVICE_DID_ALIAS, DID_PROVIDER, KMS } from './index';
import { IDataStore, IDIDManager, IKeyManager, IResolver, TAgent} from "@veramo/core";
import { IDataStoreORM } from "@veramo/data-store";
import { Connection } from "typeorm";
import { VeramoAgentConfigOverrides } from "./veramoAgentConfig";
import fs from "fs";

// requires calling initVeramo to create this local singleton agent and dbConnection
let agent: TAgent<IDIDManager & IKeyManager & IDataStore & IDataStoreORM & IResolver>;
let dbConnection: Connection;
let dbFile: string;
/**
 * Truing up the local Veramo DID store.
 */
export const initVeramo = async (overrides: VeramoAgentConfigOverrides = null) => {
  dbFile = overrides?.dbFile;
  ({ agent, dbConnection } = (await createVeramoAgent(overrides)));
  // Create our service's DID to sign stuff on our behalf (happens once per environment and is a no-op afterwards).
  await agent.didManagerGetOrCreate({
    alias: SERVICE_DID_ALIAS,
    provider: DID_PROVIDER,
    kms: KMS,
  });

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

/**
 * Creates a new DID and labels it with the given alias for subsequent lookup.
 * @param alias
 */
export const createDid = async (alias:string) =>
  agent.didManagerCreate({
    alias,
    provider: DID_PROVIDER,
    kms: KMS,
  });

// export const deleteDid = async (alias:string) =>
//   agent.didManagerDelete({ alias });

export const findDaemonDid = async () => (await agent.didManagerFind({ alias: SERVICE_DID_ALIAS }))[0];
export const findDid = async (alias:string) => (await agent.didManagerFind({ alias }))[0];

export const createKudosVc = async (toDidAlias:string, fromDidAlias:string, kudosDescription:string) => {
  const verifiableCredential = await _createVc(
    toDidAlias,
    fromDidAlias,
    'kudos',
    {
      kudos: kudosDescription,
    });
  return verifiableCredential;
};

const _createVc = async (toDidAlias:string, fromDidAlias:string, credentialType:string, credential:object) => {
  const fromDid = await findDid(fromDidAlias);
  const toDid = await findDid(toDidAlias);
  // TODO: define some VC schemas
 return agent.createVerifiableCredential({
    credential: {
      issuer: { id: fromDid.did },
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiableCredential', credentialType],
      issuanceDate: new Date().toISOString(),
      credentialSubject: {
        ...credential, // TODO: is this where credential contents go?
        id: toDid.did,
        name: toDidAlias, // TODO: will our aliases be descriptive enough to use as name?
      },
    },
    proofFormat: 'jwt',
    save: true,
  });
}

const findVc = async () => {
  agent.didManagerFind()
};
