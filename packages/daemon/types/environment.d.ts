declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DISCORD_CLIENT_ID: string;
      DISCORD_API_TOKEN: string;
    }
  }
}

export {}
