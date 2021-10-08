import type { DaoProfileVc, PunkProfileVc } from '@sobol/daemon-types/veramo-types';
import { KudosVc, SecondedKudosVc } from '@sobol/daemon-types/veramo-types';

const ApiClient = {
  Vcs: {
    getDaos: async () => {
      const response = await fetch('http://localhost:8081/vcs/daos');
      const result = await response.json();
      return result as DaoProfileVc[];
    },
    getDao: async (daoId: string) => {
      const response = await fetch(`http://localhost:8081/vcs/daos/${daoId}`);
      const result = await response.json();
      return result as DaoProfileVc;
    },
    getPunks: async () => {
      const response = await fetch('http://localhost:8081/vcs/punks');
      const result = await response.json();
      return result as PunkProfileVc[];
    },
    getPunk: async (punkId: string) => {
      const response = await fetch(`http://localhost:8081/vcs/punks/${punkId}`);
      const result = await response.json();
      return result as PunkProfileVc;
    },
    getPunkKudos: async (punkId: string) => {
      const response = await fetch(`http://localhost:8081/vcs/punks/${punkId}/kudos`);
      const { kudos, secondedKudos } = await response.json();
      return { kudos, secondedKudos } as { kudos: KudosVc[], secondedKudos: SecondedKudosVc[] };
    },
  }
};

export default ApiClient;
