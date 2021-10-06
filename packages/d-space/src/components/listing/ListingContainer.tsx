import React, { FunctionComponent } from 'react';
import { Space } from 'antd';
import Card from "./Card";

type ListingProps = {}

const ListingContainer: FunctionComponent<ListingProps> = () => (
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
