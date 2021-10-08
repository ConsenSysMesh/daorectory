import React, { FunctionComponent, useContext, useEffect, useMemo, useState } from 'react';
import ProfileContainer from '../components/profile/ProfileContainer';
import {
  KudosVc,
  SecondedKudosVc,
} from '@sobol/daemon-types/veramo-types';
import { Objects } from '../config/constants';
import ApiClient from '../ApiClient';
import { useRouteMatch } from 'react-router-dom';
import { AppContext } from '../App';

type ProfileProps = {
  type: string,
}

type RouteParams = {
  id: string;
}

const Profile: FunctionComponent<ProfileProps> = ({ type }) => {
  const match = useRouteMatch<RouteParams>('/*/:id');
  if (!match) throw new Error('NO MATCH');
  const { params: { id } } = match;
  const { daoProfilesById, punkProfilesById } = useContext(AppContext);
  const profile = useMemo(
    () => type === Objects.Dao ? daoProfilesById[id] : punkProfilesById[id],
    [id, type, daoProfilesById, punkProfilesById],
  );
  const [punkKudos, setPunkKudos] = useState<{ kudos: KudosVc[], secondedKudos: SecondedKudosVc[] }>({ kudos: [], secondedKudos: [] });
  useEffect(() => {
    if (type === Objects.Punk) {
      ApiClient.Vcs.getPunkKudos(id).then(setPunkKudos);
    }
  }, [type, id]);

  return (
    <ProfileContainer
      profile={profile}
      type={type}
      loading={!profile}
      kudos={punkKudos.kudos}
      secondedKudos={punkKudos.secondedKudos}
    />
  );
}

export default Profile;
