import React, {FC, useState} from 'react';
import { Card, Modal } from "antd";
import ProfileLink from "./ProfileLink";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { DaoProfileVc, PunkProfileVc } from '@sobol/daemon-types/veramo-types';

type Props = {
  issuerProfile?: PunkProfileVc,
  dao?: DaoProfileVc,
  regarding: string,
  channel: string,
  seconders: number,
}

const KudoCard: FC<Props> = ({
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
        View Details
    </div>
  );

  const dot = <span className="ProfileCard--dot">•</span>;

  const sampleJson = '{"name":"John", "age":30, "car":null}';

  const handleOk = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Card
        title={<>
          <ProfileLink
            title={issuerProfile?.credentialSubject?.name || ''}
            src={issuerProfile?.credentialSubject?.avatarUrl}
            size="large"
          /> {dot} DID
        </>}
        actions={[cardButtons]}
        className="ProfileCard"
      >
        <p>{regarding}</p>
        <div className="ProfileCard--info">
          <ProfileLink
            title={dao?.credentialSubject?.name}
            src={dao?.credentialSubject?.avatarUrl}
            size="small"
          /> {dot} {channel} {dot} DID {dot} Seconders ({seconders})
        </div>
      </Card>

      <Modal
        title="Details"
        visible={modalVisible}
        onCancel={handleOk}
        footer={null}
      >
        <SyntaxHighlighter language="json" style={darcula}>
          {JSON.stringify(JSON.parse(sampleJson), null, 2)}
        </SyntaxHighlighter>
      </Modal>
    </>
  );
};

export default KudoCard;
