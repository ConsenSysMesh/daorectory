import React, { FunctionComponent } from 'react';
import ProfileContainer from "../components/profile/ProfileContainer";

type ProfileProps = {
  type: string,
}

const Profile: FunctionComponent<ProfileProps> = ({ type }) => (
  <ProfileContainer />
);

export default Profile;
