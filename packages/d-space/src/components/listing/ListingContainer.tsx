import React, { FC } from 'react';
import { Space } from 'antd';
import Card from "./Card";

type Props = {}

const ListingContainer: FC<Props> = () => (
  <Space size={[16, 16]} wrap className="ListingContainer">
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
  </Space>
);

export default ListingContainer;
