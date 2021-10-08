import React, {FC, useState} from 'react';
import { Card, Modal } from "antd";
import ProfileLink from "./ProfileLink";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
  title: string
}

const ProfileCard: FC<Props> = ({ title = 'Funk Punk' }) => {
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
        title={(<><ProfileLink title={title} size="large" /> {dot} DID</>)}
        actions={[cardButtons]}
        className="ProfileCard"
      >
        <p>Nullam placerat ex eu orci euismod, a vulputate risus ornare. Nulla sed finibus odio. Donec elementum nulla quam, non aliquet odio efficitur ut.</p>
        <div className="ProfileCard--info">
          <ProfileLink title="Funk Punk" size="small" /> {dot} #media-station {dot} DID {dot} Seconders (2)
        </div>
      </Card>

      <Modal
        title="Details"
        visible={modalVisible}
        onCancel={handleOk}
        footer={null}
        className="ProfileCard--modal"
      >
        <SyntaxHighlighter language="json" style={darcula}>
          {JSON.stringify(JSON.parse(sampleJson), null, 2)}
        </SyntaxHighlighter>
      </Modal>
    </>
  );
};

export default ProfileCard;