export declare type VeramoAgentConfigOverrides = {
  dbFile: string,
  veramoSecret: string,
  infuraProjectId: string,
};

export enum VcTypes {
  DaoProfile = 'daoProfile',
  PunkProfile = 'punkProfile',
  Kudos = 'kudos',
  SecondedKudos = 'secondedKudos',
}

export declare type DaoProfileVcSubject = {
  name: string,
  discordId: string,
  avatarUrl: string,
};

export declare type PunkProfileVcSubject = {
  name: string,
  discordId: string,
  avatarUrl: string,
};

export declare type KudosVcSubject = {
  message: string,
  description: string,
  credentialId?: string, // unique ID we generate for this VC
  daoId?: string, // for ease of relating VCs received within a specific DAO
};

export declare type SecondedKudosVcSubject = {
  originalKudosId: string, // reference to credentialId of the original kudos
  credentialId?: string,  // unique ID we generate for this VC
  daoId?: string, // for ease of relating VCs received within a specific DAO
  message?: string, // optional msg to go with +1 sentiment
};