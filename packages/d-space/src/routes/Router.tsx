import React from 'react';
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Listing from "./Listing";
import Profile from "./Profile";
import { Objects, Pages } from "../config/constants";

const Router = () => (
  <Switch>
    <Route path={`/${Pages.Doas}`}>
      <Listing type={Objects.Doa} />
    </Route>
    <Route path={`/${Pages.Punks}`}>
      <Listing type={Objects.Punk} />
    </Route>
    <Route path={`/${Pages.Doa}/:id`}>
      <Profile type={Objects.Punk} />
    </Route>
    <Route path={`/${Pages.Punk}/:id`}>
      <Profile type={Objects.Punk} />
    </Route>
    <Redirect to={`/${Pages.Doas}`} />
  </Switch>
);

export default Router;
