import React, { useEffect, useState } from 'react';
import Router from "./routes/Router";
import Header from "./layouts/Header";
import Background from "./layouts/Background";
import Content from "./layouts/Content";
import {
  DaoProfileVc,
  KudosVc,
  PunkProfileVc,
  SecondedKudosVc,
} from '@sobol/daemon-types/veramo-types';
import ApiClient from './ApiClient';
import _ from 'lodash';

type AppContextType = {
  daoProfilesById: Record<string, DaoProfileVc>,
  punkProfilesById: Record<string, PunkProfileVc>,
  kudosByPunkId: Record<string, KudosVc[]>,
  secondedKudosByKudosId: Record<string, SecondedKudosVc[]>,
}

export const AppContext = React.createContext<AppContextType>({
  daoProfilesById: {},
  punkProfilesById: {},
  kudosByPunkId: {},
  secondedKudosByKudosId: {},
});

const App = () => {
  const [daoProfilesById, setDaoProfilesById] = useState({});
  const [punkProfilesById, setPunkProfilesById] = useState({});
  const [kudosByPunkId, setKudosByPunkId] = useState({});
  const [secondedKudosByKudosId, setSecondedKudosByKudosId] = useState({});

  useEffect(() => {
    ApiClient.Vcs.getDaos().then(daos => setDaoProfilesById(_.keyBy(daos, p => p.credentialSubject.discordId)));
    ApiClient.Vcs.getPunks().then(punks => {
      setPunkProfilesById(_.keyBy(punks, p => p.credentialSubject.discordId));
      const punksByDid = _.keyBy(punks, p => p.credentialSubject.id);
      ApiClient.Vcs.getAllKudos()
        .then(({ kudos, secondedKudos }) => {
          setKudosByPunkId(_.groupBy(kudos, k => punksByDid[k.credentialSubject.id]?.credentialSubject?.discordId));
          setSecondedKudosByKudosId(_.groupBy(secondedKudos, sk => sk.credentialSubject.originalKudosId));
        });
    });
  }, []);

  return (
    <AppContext.Provider value={{ daoProfilesById, punkProfilesById, kudosByPunkId, secondedKudosByKudosId }}>
      <div className="App">
        <Background />
        <Header />
        <Content className="App--content">
          <Router />
        </Content>
      </div>
    </AppContext.Provider>
  );
}

export default App;
