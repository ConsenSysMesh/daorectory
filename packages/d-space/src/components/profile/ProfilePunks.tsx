import React, { useContext, useMemo } from 'react';
import { Space, Empty } from "antd";
import ProfileLink from "./ProfileLink";
import { FC } from 'react';
import { AppContext } from '../../App';
import { Objects } from '../../config/constants';

const routePrefix = process.env.REACT_APP_ENV_PREFIX;

const ProfilePunks: FC<{ daoId?: string }> = ({ daoId }) => {
  const { kudosByPunkId, punkProfilesById } = useContext(AppContext);
  const punks = useMemo(() => Object.entries(kudosByPunkId)
      .filter(([, kudos]) => {
        return kudos.find(k => k.credentialSubject.daoId === daoId);
      }),
    [kudosByPunkId, daoId],
  );
  return (punks.length ?
    <Space size={[0, 0]} wrap className="ProfileContainer--work">
      {punks.map(([punkId, kudos]) => {
        const punk = punkProfilesById[punkId];
        return (
          <ProfileLink
            title={punk?.credentialSubject?.name}
            to={`${routePrefix}/${Objects.Punk}/${punkId}`}
            src={punk?.credentialSubject?.avatarUrl}
            isTile
            badgeCount={kudos.length}
          />
        );
      })}
    </Space> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No Members Found" />
  );
};

export default ProfilePunks;
