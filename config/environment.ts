export const environment = {
  development: {
    apiUrl: 'http://localhost:3000',
    debug: true,
    analytics: false,
  },
  // production: {
  //   apiUrl: 'https://api.seuprojeto.com',
  //   debug: false,
  //   analytics: true,
  // },
  test: {
    apiUrl: 'http://localhost:3001',
    debug: true,
    analytics: false,
  }
};

export const currentEnv = import.meta.env.MODE as keyof typeof environment;
export const config = environment[currentEnv] || environment.development;
