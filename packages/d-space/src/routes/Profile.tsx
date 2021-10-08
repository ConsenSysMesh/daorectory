import React, { FunctionComponent, useEffect, useState } from 'react';
import ProfileContainer from '../components/profile/ProfileContainer';
import { DaoProfileVc, PunkProfileVc } from '@sobol/daemon-types/veramo-types';
import { Objects } from '../config/constants';
import ApiClient from '../ApiClient';
import { useRouteMatch } from 'react-router-dom';

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
  const [profile, setProfile] = useState<DaoProfileVc | PunkProfileVc | null>(null);
  useEffect(() => {
    if (type === Objects.Dao) {
      ApiClient.Vcs.getDao(id)
        .then(profile => setProfile(profile))
    } else {
      ApiClient.Vcs.getPunk(id)
        .then(profile => setProfile(profile))
    }
  }, [type, id]);

  return (
    <ProfileContainer profile={profile} type={type} loading={!profile} />
  );
}

export default Profile;
