import React, { FunctionComponent, useEffect, useState } from 'react';
import ListingContainer from "../components/listing/ListingContainer";
import ApiClient from '../ApiClient';
import { Objects } from '../config/constants';
import { DaoProfileVc, PunkProfileVc } from '@sobol/daemon-types/veramo-types';

type ListingProps = {
  type: string,
}

const Listing: FunctionComponent<ListingProps> = ({ type }) => {
  const [objects, setObjects] = useState<DaoProfileVc[] | PunkProfileVc[]>([]);
  useEffect(() => {
    if (type === Objects.Dao) {
      ApiClient.Vcs.getDaos()
        .then(setObjects);
    } else {
      ApiClient.Vcs.getPunks()
        .then(setObjects);
    }
  }, [type]);
  return (
    <ListingContainer objects={objects} type={type} />
  );
};

export default Listing;
