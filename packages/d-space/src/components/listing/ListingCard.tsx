import React, { FC } from 'react';
import {DaoProfileVc, PunkProfileVc} from "@sobol/daemon-types/veramo-types";
import {Avatar, Card} from "antd";
import { NavLink } from "react-router-dom";

type Props = {
  object: DaoProfileVc | PunkProfileVc,
  type: string,
}

const ListingCard: FC<Props> = ({
  object,
  type
}) => {
  const { credentialSubject: { avatarUrl, name, discordId } } = object;
  const url = `/${type}/${discordId}`;

  return (
    <NavLink to={url}>
      <Card
        className="ListingCard"
        hoverable
        // cover={<img alt="example" src="/card-bg.png" />}
      >
        <div className="ListingCard--body">
          <div className="ListingCard--avatar">
            <Avatar src={avatarUrl} size={110} />
          </div>
          <h1 className="ListingCard--title">{name}</h1>
        </div>
        <div className="ListingCard--footer">5000 Members</div>
      </Card>
    </NavLink>
  );
}

export default ListingCard;
