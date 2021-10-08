import { VerifiableCredential } from '@veramo/core';

export declare type VeramoAgentConfigOverrides = {
  dbFile: string,
  veramoSecret: string,
  infuraProjectId: string,
};

declare interface DaemonVc extends VerifiableCredential {
  credentialSubject: {
    id: string, // ID of DID that the VC is for
    credentialId: string;
  }
}

export declare type DaoProfileVc = DaemonVc & {
  credentialSubject: {
    name: string,
    discordId: string,
    avatarUrl: string,
  }
}

export declare type PunkProfileVc = DaemonVc & {
  credentialSubject: {
    name: string,
    discordId: string,
    avatarUrl: string,
  }
}

export declare type KudosVc = DaemonVc & {
  credentialSubject: {
    message: string,
    description: string,
    daoId: string, // for ease of relating VCs received within a specific DAO
  },
}

export declare type SecondedKudosVc = DaemonVc & {
  credentialSubject: {
    originalKudosId: string, // reference to credentialId of the original kudos
    message?: string, // optional msg to go with +1 sentiment
    daoId: string, // for ease of relating VCs received within a specific DAO
    issuerId: string;
  },
}