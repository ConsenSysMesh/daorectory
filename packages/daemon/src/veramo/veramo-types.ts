export declare type VeramoAgentConfigOverrides = {
  dbFile: string,
  veramoSecret: string,
  infuraProjectId: string,
};

export enum VcTypes {
  Kudos = 'kudos',
};

export declare type KudoVcSubject = {
  description: string,
  daoId?: string, // for ease of relating VCs received within a specific DAO
  // TODO: do we need to cache these names here?
  createdBy: string, // discord nickname of the giving user?
  discordServer: string, // discord server name?
};