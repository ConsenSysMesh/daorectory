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
    <Space size={[16, 16]} wrap>
      {objects.map(o => <ListingCard key={o.id} object={o} />)}
    </Space>
  </div>
);

export default ListingContainer;
