import React, {useEffect} from 'react';
import {
  Switch,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";

import Listing from "./Listing";
import Profile from "./Profile";
import { Objects, Pages } from "../config/constants";

export const Routes = {
  Daos: `/${Pages.Daos}`,
  Punks: `/${Pages.Punks}`,
  Dao: `/${Pages.Dao}/:id`,
  Punk: `/${Pages.Punk}/:id`,
};

const Router = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Switch>
      <Route path={Routes.Daos}>
        <Listing type={Objects.Dao} />
      </Route>
      <Route path={Routes.Punks}>
        <Listing type={Objects.Punk} />
      </Route>
      <Route path={Routes.Dao}>
        <Profile type={Objects.Dao} />
      </Route>
      <Route path={Routes.Punk}>
        <Profile type={Objects.Punk} />
      </Route>
      <Redirect to={Routes.Daos} />
    </Switch>
  );
}

export default Router;
