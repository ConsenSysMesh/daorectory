import React, { FC } from 'react';
import { Space } from 'antd';
import ListingCard from "./ListingCard";
import { DaoProfileVc, PunkProfileVc } from '@sobol/daemon-types/veramo-types';

type Props = {
  type: string,
  objects: DaoProfileVc[] | PunkProfileVc[],
};

const ListingContainer: FC<Props> = ({ type, objects }) => (
  <div className="ListingContainer">
    <div className="ListingContainer--title">
      <h1>The D-Space</h1>
      <p>An expansive, curated directory of DAOs and Punks that are up to amazing stuff.</p>
    </div>

    <div className="ListingContainer--container">
      <Space size={[16, 70]} wrap>
        {objects.map(o => <ListingCard type={type} key={o.id} object={o} />)}
      </Space>
    </div>
  </div>
);

export default ListingContainer;
