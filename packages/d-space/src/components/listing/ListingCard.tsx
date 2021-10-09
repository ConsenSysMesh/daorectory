import React, {FC, useContext, useMemo} from 'react';
import {DaoProfileVc, PunkProfileVc} from "@sobol/daemon-types/veramo-types";
import {Avatar, Card} from "antd";
import { NavLink } from "react-router-dom";
import {AppContext} from "../../App";
import { isProfilePunk } from "../profile/ProfileContainer";

type Props = {
  object: DaoProfileVc | PunkProfileVc,
  type: string,
}

const ListingCard: FC<Props> = ({
  object,
  type
}) => {
  const isPunk = isProfilePunk(object, type);
  const { credentialSubject: { avatarUrl, name, discordId } } = object;
  const url = `/${type}/${discordId}`;

  const { kudosByPunkId } = useContext(AppContext);
  const punks = useMemo(() => Object.entries(kudosByPunkId)
      .filter(([, kudos]) => {
        return kudos.find(k => k.credentialSubject.daoId === object?.credentialSubject?.discordId);
      }),
    [kudosByPunkId, object],
  );
  const kudos = kudosByPunkId[object?.credentialSubject?.discordId];

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
        {!isPunk && <div className="ListingCard--footer">
          {punks.length} {`Member${punks.length !== 1 ? 's' : ''}`}
        </div>}

        {isPunk && <div className="ListingCard--footer">
          {kudos?.length ? kudos.length : 0} {`Claim${kudos?.length !== 1 ? 's' : ''}`}
        </div>}
      </Card>
    </NavLink>
  );
}

export default ListingCard;
