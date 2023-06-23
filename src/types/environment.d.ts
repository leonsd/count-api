declare global {
  namespace NodeJS {
    interface ProcessEnv {
      COUNT_API_BASE_URL: string;
    }
  }
}

export { }
