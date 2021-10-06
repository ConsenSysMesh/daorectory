// Core interfaces
import fs from 'fs';
import { createAgent, IDIDManager, IResolver, IDataStore, IKeyManager } from '@veramo/core';
import { DIDManager } from '@veramo/did-manager';
import { EthrDIDProvider } from '@veramo/did-provider-ethr';
import { WebDIDProvider } from '@veramo/did-provider-web';
import { KeyManager } from '@veramo/key-manager';
import { KeyManagementSystem, SecretBox } from '@veramo/kms-local';
import { DIDResolverPlugin } from '@veramo/did-resolver';
import { Resolver } from 'did-resolver';
import { getResolver as ethrDidResolver } from 'ethr-did-resolver';
import { getResolver as webDidResolver } from 'web-did-resolver';

// Storage plugin using TypeOrm
import { Entities, KeyStore, DIDStore, DataStore, IDataStoreORM, DataStoreORM, PrivateKeyStore, migrations } from '@veramo/data-store';
import { CredentialIssuer, ICredentialIssuer } from '@veramo/credential-w3c'
// TypeORM is installed with `@veramo/data-store`
import { createConnection } from 'typeorm';
import { VeramoAgentConfigOverrides } from "./veramoAgentConfig";
// This will be the name for the local sqlite database for demo purposes
const DATABASE_FILE = 'database.sqlite';

// Project ID from infura https://www.infura.io
const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID;
const VERAMO_SECRET_KEY = process.env.VERAMO_SECRET_KEY;
export const SERVICE_DID_ALIAS = 'DAEMON_DID';
export const ETH_NETWORK = 'rinkeby';
export const DID_PROVIDER = `did:ethr:${ETH_NETWORK}`;
export const KMS = 'local';

const createVeramoDbConnection = (overrides: VeramoAgentConfigOverrides = null) => {
  const { dbFile = DATABASE_FILE } = overrides || {};
  const dbExists = fs.existsSync(dbFile);
  return createConnection({
    name: 'test',
    type: 'sqlite',
    database: dbFile,
    logging: ['error', 'info', 'warn'],
    // TODO: we wouldn't want to automagically do this in production
    // synchronize: !dbExists, // if DB file doesn't exist, allow the ORM to initialize Veramo schema
    entities: Entities,
    synchronize: false,
    migrations,
    migrationsRun: true,
  });
};

export const createVeramoAgent = async (overrides: VeramoAgentConfigOverrides = null) => {
  const { veramoSecret = VERAMO_SECRET_KEY, infuraProjectId = INFURA_PROJECT_ID } = overrides || {};
  const dbConnection = createVeramoDbConnection(overrides);
  const agent = createAgent<IDIDManager & IKeyManager & IDataStore & IDataStoreORM & IResolver & ICredentialIssuer>({
    plugins: [
      new KeyManager({
        store: new KeyStore(dbConnection),
        kms: {
          local: new KeyManagementSystem(new PrivateKeyStore(dbConnection, new SecretBox(veramoSecret))),
        },
      }),
      new DIDManager({
        store: new DIDStore(dbConnection),
        defaultProvider: DID_PROVIDER,
        providers: {
          [DID_PROVIDER]: new EthrDIDProvider({
            defaultKms: KMS,
            network: ETH_NETWORK,
            rpcUrl: `https://${ETH_NETWORK}.infura.io/v3/${infuraProjectId}`,
          }),
          'did:web': new WebDIDProvider({
            defaultKms: KMS,
          }),
        },
      }),
      new DIDResolverPlugin({
        resolver: new Resolver({
          ...ethrDidResolver({ infuraProjectId: infuraProjectId }),
          ...webDidResolver(),
        }),
      }),
      new DataStore(dbConnection),
      new DataStoreORM(dbConnection),
      new CredentialIssuer(),
    ],
  });
  const con = await dbConnection;
  return { agent, dbConnection: con };
}
