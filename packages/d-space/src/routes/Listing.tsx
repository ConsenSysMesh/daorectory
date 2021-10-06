import React, { FunctionComponent } from 'react';
import ListingContainer from "../components/listing/ListingContainer";

type ListingProps = {
  type: string,
}

const Listing: FunctionComponent<ListingProps> = ({ type }) => (
  <ListingContainer />
);

export default Listing;
