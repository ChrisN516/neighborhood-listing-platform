import Ajv2020 from "ajv/dist/2020";
import addFormats from "ajv-formats";
import propertySchema from "../../schemas/property.schema.json";
import generatedData from "../../data/generated/properties.json";
import type { Property as GeneratedProperty } from "../types/generated-property";
import type { Property, Sponsor } from "../types";

const ajv = new Ajv2020({ allErrors: true });
addFormats(ajv);

const validateProperty = ajv.compile(propertySchema);
const validRecords: GeneratedProperty[] = [];

for (const record of generatedData) {
  if (validateProperty(record)) {
    validRecords.push(record as unknown as GeneratedProperty);
  }
}

export const validationMessage =
  validRecords.length === generatedData.length
    ? null
    : "Some invalid property records were not displayed.";

export const properties: Property[] = validRecords.map((record) => ({
  id: record.property_id,
  title: record.title,
  streetAddress: record.street_address,
  city: record.city,
  state: record.state,
  price: record.price,
  bedrooms: record.bedrooms,
  bathrooms: record.bathrooms,
  squareFootage: record.square_feet,
  imageUrl: "/property-home.svg",
  propertyDetailsUrl: record.property_details_url,
}));

const firstSponsor = validRecords[0]?.local_sponsors[0];

export const sponsor: Sponsor | null = firstSponsor
  ? {
      id: firstSponsor.sponsor_id,
      businessName: firstSponsor.business_name,
      websiteUrl: firstSponsor.website_url,
      description: firstSponsor.description,
    }
  : null;