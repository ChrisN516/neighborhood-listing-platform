export interface PropertyListing {
  id: string;
  title: string;
  streetAddress: string;
  city: string;
  state: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  imageUrl: string;
  propertyDetailsUrl: string;
}

export type Property = PropertyListing;

export interface Sponsor {
  id: string;
  businessName: string;
  websiteUrl: string;
  description?: string;
}