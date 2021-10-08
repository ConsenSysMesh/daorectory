import React, { FC } from 'react';
import { Card } from "antd";
import ProfileLink from "./ProfileLink";

type Props = {
  title: string
}

const ProfileCard: FC<Props> = ({ title = 'Funk Punk' }) => {
  const cardButtons = (
    <div className="ProfileCard--button">View Details</div>
  );

  return (
    <Card
      title={(<><ProfileLink title={title} size="large" /> * DID</>)}
      actions={[cardButtons]}
      className="ProfileCard"
    >
      <p>Nullam placerat ex eu orci euismod, a vulputate risus ornare. Nulla sed finibus odio. Donec elementum nulla quam, non aliquet odio efficitur ut.</p>
      <div className="ProfileCard--info">
        <ProfileLink title="Funk Punk" size="small" /> * #media-station * DID * Seconders (2)
      </div>
    </Card>
  );
};

export default ProfileCard;