import React, { FC, useContext, useMemo } from 'react';
import {Timeline} from "antd";
import { ClockCircleOutlined, CalendarOutlined } from "@ant-design/icons";
import KudoCard from "./KudoCard";
import { KudosVc, SecondedKudosVc } from '@sobol/daemon-types/veramo-types';
import { AppContext } from '../../App';
import _ from 'lodash';

type Props = {
  kudos: KudosVc[],
  secondedKudos: SecondedKudosVc[],
};

const KudosTimelineItem: FC<{ kudos: KudosVc, secondedKudos: SecondedKudosVc[] }> = ({
  kudos,
  secondedKudos,
}) => {
  const { daoProfilesById, punkProfilesById } = useContext(AppContext);
  const issuerPunk = punkProfilesById[kudos.credentialSubject.issuerId];
  const dao = daoProfilesById[kudos.credentialSubject.daoId];

  const seconders = useMemo(() =>
    secondedKudos.filter(k => k.credentialSubject.originalKudosId === kudos.credentialSubject.credentialId),
    [secondedKudos, kudos.credentialSubject.credentialId],
  );

  return (
    <Timeline.Item className="ProfileTimeline--item">
      <KudoCard
        kudos={kudos}
        issuerProfile={issuerPunk}
        dao={dao}
        regarding={kudos.credentialSubject.description}
        channel={kudos.credentialSubject.channel}
        seconders={seconders.length}
      />
    </Timeline.Item>
  )
}

const ProfileTimeline: FC<Props> = ({ kudos, secondedKudos }) => {
  return (
    <Timeline className="ProfileTimeline">
      <Timeline.Item className="ProfileTimeline--year" dot={<CalendarOutlined />}>2021</Timeline.Item>
      <Timeline.Item className="ProfileTimeline--month" dot={<ClockCircleOutlined />}>Sept 21</Timeline.Item>
      {_.sortBy(kudos, 'issuanceDate').reverse().map(k => <KudosTimelineItem kudos={k} secondedKudos={secondedKudos} key={k.credentialSubject.credentialId} />)}
    </Timeline>
  );
};

export default ProfileTimeline;