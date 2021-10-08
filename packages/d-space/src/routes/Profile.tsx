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
  if (!match) throw 'NO';
  const { params: { id } } = match;
  const [profile, setProfile] = useState<DaoProfileVc | PunkProfileVc | null>(null);
  useEffect(() => {
    if (type === Objects.Punk) {
      ApiClient.Vcs.getPunk(id)
        .then(profile => setProfile(profile))
    }
  }, [type, id]);

  if (!profile) return <div>loading</div>;
  return (
    <ProfileContainer profile={profile} type={type} />
  );
}

export default Profile;
