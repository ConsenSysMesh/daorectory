import React from 'react';
import {Space} from "antd";
import ProfileLink from "./ProfileLink";

const ProfileWork = () => {
  return (
    <Space size={[0, 0]} wrap className="ProfileContainer--work">
      <ProfileLink title="Some title" isTile badgeCount={1000}/>
      <ProfileLink title="Some title" isTile badgeCount={1000}/>
      <ProfileLink title="Some title" isTile badgeCount={1000}/>
      <ProfileLink title="Some title" isTile badgeCount={1000}/>
      <ProfileLink title="Some title" isTile badgeCount={1000}/>
      <ProfileLink title="Some title" isTile badgeCount={1000}/>
      <ProfileLink title="Some title" isTile badgeCount={1000}/>
      <ProfileLink title="Some title" isTile badgeCount={1000}/>
    </Space>
  );
};

export default ProfileWork;