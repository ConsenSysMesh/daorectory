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
  createdBy: string, // discord id?
};