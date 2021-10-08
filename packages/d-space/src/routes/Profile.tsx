import React, { FunctionComponent, useState } from 'react';
import ProfileContainer from '../components/profile/ProfileContainer';
import { DaoProfileVc, PunkProfileVc } from '@sobol/daemon-types/veramo-types';

type ProfileProps = {
  type: string,
}

const Profile: FunctionComponent<ProfileProps> = ({ type }) => {
  const [profile, setProfile] = useState<DaoProfileVc | PunkProfileVc | null>(null);
  return (
    <ProfileContainer />
  );
}

export default Profile;
