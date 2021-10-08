import React, { FC } from 'react';
import {Avatar, Button, Image, Spin} from 'antd';
import { EllipsisOutlined, ShareAltOutlined } from '@ant-design/icons';
import ProfileTimeline from "./ProfileTimeline";
import ProfileLink from "./ProfileLink";
import ProfileSection from "./ProfileSection";
import ProfileWork from "./ProfileWork";
import type {
  DaemonVc,
  DaoProfileVc,
  KudosVc,
  PunkProfileVc, SecondedKudosVc,
} from '@sobol/daemon-types/veramo-types';
import { Objects } from '../../config/constants';

type Props = {
  profile: PunkProfileVc | DaoProfileVc | null,
  type: string,
  loading: boolean,
  kudos: KudosVc[],
  secondedKudos: SecondedKudosVc[],
}

const isProfilePunk = (profile: DaemonVc | null, type: string): profile is PunkProfileVc => type === Objects.Punk;

const ProfileContainer: FC<Props> = ({
 profile,
 type,
 kudos,
 secondedKudos,
 loading = true,
}) => {
  const isPunk = isProfilePunk(profile, type);

  return (
    <div className="ProfileContainer">
      {loading ? <div className="ProfileContainer--loading"><Spin /></div> : (
        <>
          <ProfileSection className="ProfileContainer--header">
            <div className="ProfileContainer--avatar">
              <Avatar
                src={<Image src={profile?.credentialSubject.avatarUrl} />}
                size={150}
              />
              <h1>{profile?.credentialSubject.name}</h1>
            </div>
            <div className="ProfileContainer--actions">
              <Button type="primary" icon={<ShareAltOutlined />} size="large">Share</Button>
              <Button shape="circle" icon={<EllipsisOutlined />} size="large" />
            </div>
          </ProfileSection>
          <ProfileSection className="ProfileContainer--identities">
            { isPunk && (
              <ProfileLink
                title={profile?.credentialSubject.handle}
                src="/discord.png"
                size="small"
              />
            )}
          </ProfileSection>
          <ProfileSection spaced>
            <h2>About Me</h2>
            <p>Nullam placerat ex eu orci euismod, a vulputate risus ornare. Nulla sed finibus odio. Donec elementum nulla quam, non aliquet odio efficitur ut. Curabitur et eleifend leo. Quisque ut turpis sit amet purus bibendum fermentum. Proin nulla magna, eleifend eu congue sed, sollicitudin ac felis. Praesent sed ornare leo. Donec vehicula, odio id molestie congue, ante quam posuere dolor, sit amet varius odio purus quis nisi.</p>
          </ProfileSection>
          <ProfileSection spaced>
            <h2>Work Experience</h2>
            <ProfileWork />
          </ProfileSection>
          <hr />
          <ProfileSection spaced>
            <h2>Timeline</h2>
            <ProfileTimeline kudos={kudos} secondedKudos={secondedKudos} />
          </ProfileSection>
        </>
      )}
    </div>
  );
};

export default ProfileContainer;
