import React, { useContext, useMemo } from 'react';
import {Space} from "antd";
import ProfileLink from "./ProfileLink";
import { FC } from 'react';
import { KudosVc } from '@sobol/daemon-types/veramo-types';
import _ from 'lodash';
import { AppContext } from '../../App';
import { Objects } from '../../config/constants';

const ProfileDAOs: FC<{ kudos: KudosVc[] }> = ({ kudos }) => {
  const { daoProfilesById } = useContext(AppContext);
  const daoIds = useMemo(() => Object.entries(
    _.groupBy(kudos, k => k.credentialSubject.daoId)),
    [kudos],
  );
  return (
    <Space size={[0, 0]} wrap className="ProfileContainer--work">
      {daoIds.map(([daoId, ks]) => {
        const dao = daoProfilesById[daoId];

        return (
          <ProfileLink
            title={dao?.credentialSubject?.name}
            to={`/${Objects.Dao}/${daoId}`}
            src={dao?.credentialSubject?.avatarUrl}
            isTile
            badgeCount={ks.length}
          />
        );
      })}
    </Space>
  );
};

export default ProfileDAOs;
