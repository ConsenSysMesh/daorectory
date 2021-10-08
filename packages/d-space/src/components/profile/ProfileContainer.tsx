import React, { FC } from 'react';
import { Avatar, Button, Image } from 'antd';
import { EllipsisOutlined, ShareAltOutlined } from '@ant-design/icons';
import ProfileTimeline from "./ProfileTimeline";
import ProfileLink from "./ProfileLink";
import ProfileSection from "./ProfileSection";
import ProfileWork from "./ProfileWork";

type Props = {}

const ProfileContainer: FC<Props> = () => (
  <div className="ProfileContainer">
    <ProfileSection className="ProfileContainer--header">
      <div className="ProfileContainer--avatar">
        <Avatar
          src={<Image src="https://lh3.googleusercontent.com/GD12XpZ4TUHe3tgStlzewrwm27j40AVdv8vvZbCmWfTFzLBHvIsGSVfNYSz0_kKWVg3aDNQAbF2pTuLEFWUus2EZrA7eLiZYAB_kAA=s0" />}
          size={150}
        />
        <h1>Funk Punk</h1>
      </div>
      <div className="ProfileContainer--actions">
        <Button type="primary" icon={<ShareAltOutlined />} size="large">Share</Button>
        <Button shape="circle" icon={<EllipsisOutlined />} size="large" />
      </div>
    </ProfileSection>
    <ProfileSection className="ProfileContainer--identities">
      <ProfileLink title="FunkPunk#6201" size="small" />
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
      <ProfileTimeline />
    </ProfileSection>
  </div>
);

export default ProfileContainer;
