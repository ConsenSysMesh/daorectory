import type { DaoProfileVc, PunkProfileVc } from '@sobol/daemon-types/veramo-types';
import { KudosVc, SecondedKudosVc } from '@sobol/daemon-types/veramo-types';

const API_HOST = process.env.REACT_APP_API_HOST || 'http://localhost:8081';
const API_URI = `${API_HOST}/api`;
console.log(`ApiClient API_URI: ${API_URI}`);

const ApiClient = {
  Vcs: {
    getDaos: async () => {
      const response = await fetch(`${API_URI}/vcs/daos`);
      const result = await response.json();
      return result as DaoProfileVc[];
    },
    getDao: async (daoId: string) => {
      const response = await fetch(`${API_URI}/vcs/daos/${daoId}`);
      const result = await response.json();
      return result as DaoProfileVc;
    },
    getPunks: async () => {
      const response = await fetch(`${API_URI}/vcs/punks`);
      const result = await response.json();
      return result as PunkProfileVc[];
    },
    getPunk: async (punkId: string) => {
      const response = await fetch(`${API_URI}/vcs/punks/${punkId}`);
      const result = await response.json();
      return result as PunkProfileVc;
    },
    getPunkKudos: async (punkId: string) => {
      const response = await fetch(`${API_URI}/vcs/punks/${punkId}/kudos`);
      const { kudos, secondedKudos } = await response.json();
      return { kudos, secondedKudos } as { kudos: KudosVc[], secondedKudos: SecondedKudosVc[] };
    },
    getAllKudos: async () => {
      const response = await fetch(`${API_URI}/vcs/kudos`);
      const { kudos, secondedKudos } = await response.json();
      return { kudos, secondedKudos } as { kudos: KudosVc[], secondedKudos: SecondedKudosVc[] };
    },
  }
};

export default ApiClient;
