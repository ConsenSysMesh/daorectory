declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DISCORD_CLIENT_ID: string;
      DISCORD_API_TOKEN: string;
      VERAMO_SECRET_KEY: string
      INFURA_PROJECT_ID: string; // not sure we'll need this if we do nothing on-chain
    }
  }
}

export {}
