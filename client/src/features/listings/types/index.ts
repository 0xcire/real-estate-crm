import { BaseResponse } from '@/types';

export type Listing = {
  id: number;
  createdAt?: Date | null;
  address: string;
  userID: number | null;
  propertyType: string;
  price: string;
  bedrooms: number;
  baths: number;
  squareFeet: number;
  description: string;
};

export type NewListing = Omit<Listing, 'id' | 'createdAt'>;

export type Listings = Array<Listing>;

export interface ListingResponse extends BaseResponse {
  listings: Listings;
}

export type UpdateListingParams = {
  id: number;
  data: Partial<NewListing>;
};

export type ListingContext = {
  previousListings: Listings | undefined;
};
