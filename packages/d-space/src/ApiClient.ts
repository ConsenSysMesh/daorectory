import { DaoProfileVc, PunkProfileVc } from '@sobol/daemon-types/veramo-types';

const ApiClient = {
  dids: {
    getDaos: async () => {
      const response = await fetch('http://localhost:8081/vcs/daos');
      const result = await response.json();
      return result as DaoProfileVc[];
    },
    getPunks: async () => {
      const response = await fetch('http://localhost:8081/vcs/punks');
      const result = await response.json();
      return result as PunkProfileVc[];
    },
  }
};

export default ApiClient;
