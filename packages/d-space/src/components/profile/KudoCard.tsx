import React, { FC, useMemo, useState } from 'react';
import { Card, Modal } from "antd";
import ProfileLink from "./ProfileLink";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { DaoProfileVc, KudosVc, PunkProfileVc } from '@sobol/daemon-types/veramo-types';
import { Objects } from '../../config/constants';

type Props = {
  kudos: KudosVc,
  issuerProfile?: PunkProfileVc,
  dao?: DaoProfileVc,
  regarding: string,
  channel: string,
  seconders: number,
}

const KudoCard: FC<Props> = ({
  kudos,
  issuerProfile,
  dao,
  regarding,
  channel,
  seconders,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const cardButtons = (
    <div
      className="ProfileCard--button"
      onClick={() => setModalVisible(true)}
    >
        View Claim
    </div>
  );

  const dot = <span className="ProfileCard--dot">•</span>;

  const sampleJson = useMemo(() => JSON.stringify(kudos), [kudos]);

  const handleOk = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Card
        title={
          <>
            <ProfileLink
              title={issuerProfile?.credentialSubject?.name || ''}
              to={`/${Objects.Punk}/${issuerProfile?.credentialSubject?.discordId}`}
              src={issuerProfile?.credentialSubject?.avatarUrl}
              size="large"
            /> {dot} DID
          </>
        }
        actions={[cardButtons]}
        className="ProfileCard"
      >
        <p>{regarding}</p>
        <div className="ProfileCard--info">
          <ProfileLink
            title={dao?.credentialSubject?.name}
            src={dao?.credentialSubject?.avatarUrl}
            to={`/${Objects.Dao}/${dao?.credentialSubject?.discordId}`}
            size="small"
          /> {dot} {channel} {dot} DID {dot} Seconders ({seconders})
        </div>
      </Card>

      <Modal
        title="Verifiable Claim (VC)"
        visible={modalVisible}
        onCancel={handleOk}
        footer={null}
        className="ProfileCard--modal"
        width={800}
      >
        <SyntaxHighlighter language="json" style={darcula}>
          {JSON.stringify(JSON.parse(sampleJson), null, 2)}
        </SyntaxHighlighter>
      </Modal>
    </>
  );
};

export default KudoCard;
