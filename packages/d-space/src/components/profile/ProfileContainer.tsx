import React, {FC, useState} from 'react';
import { Avatar, Button, Image, Spin, Modal } from 'antd';
import { ShareAltOutlined } from '@ant-design/icons';
import ProfileTimeline from "./ProfileTimeline";
import ProfileLink from "./ProfileLink";
import ProfileSection from "./ProfileSection";
import ProfileDAOs from "./ProfileDAOs";
import type {
  DaemonVc,
  DaoProfileVc,
  KudosVc,
  PunkProfileVc, SecondedKudosVc,
} from '@sobol/daemon-types/veramo-types';
import { Objects } from '../../config/constants';
import ProfilePunks from './ProfilePunks';
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {darcula} from "react-syntax-highlighter/dist/esm/styles/prism";

const routePrefix = process.env.REACT_APP_ENV_PREFIX;

type Props = {
  profile: PunkProfileVc | DaoProfileVc | null,
  type: string,
  loading: boolean,
  kudos: KudosVc[],
  secondedKudos: SecondedKudosVc[],
}

export const isProfilePunk = (profile: DaemonVc | null, type: string): profile is PunkProfileVc => type === Objects.Punk;

const ProfileContainer: FC<Props> = ({
 profile,
 type,
 kudos,
 secondedKudos,
 loading = true,
}) => {
  const isPunk = isProfilePunk(profile, type);
  const [modalVisible, setModalVisible] = useState(false);

  const handleOk = () => {
    setModalVisible(false);
  };

  return (
    <>
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
                <Button size="large" onClick={() => setModalVisible(true)}>View DID</Button>
              </div>
            </ProfileSection>
            <ProfileSection className="ProfileContainer--identities">
              { isPunk && (
                <ProfileLink
                  title={profile?.credentialSubject.handle}
                  to="#"
                  src={`${routePrefix}/discord.png`}
                  size="small"
                />
              )}
            </ProfileSection>
            <ProfileSection spaced>
              <h2>About Me</h2>
              <p>{profile?.credentialSubject?.blurb || 'Nullam placerat ex eu orci euismod, a vulputate risus ornare. Nulla sed finibus odio. Donec elementum nulla quam, non aliquet odio efficitur ut. Curabitur et eleifend leo. Quisque ut turpis sit amet purus bibendum fermentum. Proin nulla magna, eleifend eu congue sed, sollicitudin ac felis. Praesent sed ornare leo. Donec vehicula, odio id molestie congue, ante quam posuere dolor, sit amet varius odio purus quis nisi.'}</p>
            </ProfileSection>
            <ProfileSection spaced>
              <h2>{isPunk ? 'Member Of' : 'Members'}</h2>
              { isPunk
                ? <ProfileDAOs kudos={kudos} />
                : <ProfilePunks daoId={profile?.credentialSubject?.discordId} />}
            </ProfileSection>

            {kudos.length ? <ProfileSection spaced>
              <h2>Verified Claims</h2>
              <ProfileTimeline kudos={kudos} secondedKudos={secondedKudos} />
            </ProfileSection> : null}
          </>
        )}
      </div>

      <Modal
        title="Decentralized Identifier (DID)"
        visible={modalVisible}
        onCancel={handleOk}
        footer={null}
        className="ProfileCard--modal"
        width={800}
      >
        <SyntaxHighlighter language="json" style={darcula}>
          {JSON.stringify(profile, null, 2)}
        </SyntaxHighlighter>
      </Modal>
  </>
  );
};

export default ProfileContainer;
