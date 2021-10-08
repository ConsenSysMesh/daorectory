import React, { FC } from 'react';
import { Space } from 'antd';
import Card from "./Card";
import { DaoProfileVc, PunkProfileVc } from '@sobol/daemon-types/veramo-types';

type Props = {
  type: string,
  objects: DaoProfileVc[] | PunkProfileVc[],
};

const ListingContainer: FC<Props> = ({ type, objects }) => (
  <Space size={[16, 16]} wrap className="ListingContainer">
    {objects.map(o => <Card key={o.id} />)}
  </Space>
);

export default ListingContainer;
