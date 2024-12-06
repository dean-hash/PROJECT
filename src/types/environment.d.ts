declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENCRYPTION_KEY: string;
      TWITTER_API_KEY: string;
      TWITTER_API_SECRET: string;
      TWITTER_ACCESS_TOKEN: string;
      TWITTER_ACCESS_TOKEN_SECRET: string;
    }
  }
}

export {};