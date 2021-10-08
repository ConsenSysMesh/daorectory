import React, { useContext, useMemo } from 'react';
import {Space} from "antd";
import ProfileLink from "./ProfileLink";
import { FC } from 'react';
import { AppContext } from '../../App';
import { Objects } from '../../config/constants';

const ProfilePunks: FC<{ daoId?: string }> = ({ daoId }) => {
  const { kudosByPunkId, punkProfilesById } = useContext(AppContext);
  const punks = useMemo(() => Object.entries(kudosByPunkId)
      .filter(([, kudos]) => {
        return kudos.find(k => k.credentialSubject.daoId === daoId);
      }),
    [],
  );
  return (
    <Space size={[0, 0]} wrap className="ProfileContainer--work">
      {punks.map(([punkId, kudos]) => {
        const punk = punkProfilesById[punkId];
        return (
          <ProfileLink
            title={punk?.credentialSubject?.name}
            to={`/${Objects.Dao}/${daoId}`}
            src={punk?.credentialSubject?.avatarUrl}
            isTile
            badgeCount={kudos.length}
          />
        );
      })}
    </Space>
  );
};

export default ProfilePunks;
