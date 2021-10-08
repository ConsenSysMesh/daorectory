import React, { useEffect, useState } from 'react';
import Router from "./routes/Router";
import Header from "./layouts/Header";
import Background from "./layouts/Background";
import Content from "./layouts/Content";
import { DaoProfileVc, PunkProfileVc } from '@sobol/daemon-types/veramo-types';
import ApiClient from './ApiClient';
import _ from 'lodash';

type AppContextType = {
  daoProfilesById: Record<string, DaoProfileVc>,
  punkProfilesById: Record<string, PunkProfileVc>,
}

export const AppContext = React.createContext<AppContextType>({
  daoProfilesById: {},
  punkProfilesById: {},
});

const App = () => {
  const [daoProfilesById, setDaoProfilesById] = useState({});
  const [punkProfilesById, setPunkProfilesById] = useState({});

  useEffect(() => {
    ApiClient.Vcs.getDaos().then(daos => setDaoProfilesById(_.keyBy(daos, p => p.credentialSubject.discordId)));
    ApiClient.Vcs.getPunks().then(punks => setPunkProfilesById(_.keyBy(punks, p => p.credentialSubject.discordId)));
  }, []);

  return (
    <AppContext.Provider value={{ daoProfilesById, punkProfilesById }}>
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
