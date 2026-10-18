\# Lab 3 Data Requirements



\## Step 1: Minimum Facts



\### Property Card

\- Property ID

\- Title

\- Street address

\- City

\- State

\- ZIP code

\- Price

\- Bedrooms

\- Bathrooms

\- Square feet

\- Primary image URL

\- Image alternative text

\- Property details URL



\### Property Detail Page

\- All property card facts

\- Property description

\- Property type

\- Listing status

\- Amenities

\- Additional images

\- Local sponsors



\### Sponsor Selection

\- Sponsor ID

\- Business name

\- Business category

\- Description

\- Website URL

\- Logo URL

\- Service ZIP codes



\### Voice Response

\- Property ID

\- Spoken summary

\- Address

\- Price

\- Bedrooms

\- Bathrooms

\- Square feet

\- Amenities



\## Step 2: Entities, Keys, and Relationships



\### Property

\- Primary key: `property\_id`

\- Represents one real-estate listing.

\- One property can be connected to multiple sponsors.



\### Sponsor

\- Primary key: `sponsor\_id`

\- Represents one local sponsoring business.

\- One sponsor can be connected to multiple properties.



\### PropertySponsor

\- Composite primary key: `property\_id` and `sponsor\_id`

\- `property\_id` is a foreign key referencing Property.

\- `sponsor\_id` is a foreign key referencing Sponsor.

\- Connects properties and sponsors without duplicating either record.



\### Relationships

\- Property has a one-to-many relationship with PropertySponsor.

\- Sponsor has a one-to-many relationship with PropertySponsor.

\- Property and Sponsor therefore have a many-to-many relationship.

## Step 9: Type Strategy

The JSON Schema in `schemas/property.schema.json` is the source of truth for validation. TypeScript types are generated in `src/types/generated-property.ts` using `json-schema-to-typescript`. The generated file should not be edited manually. It should be regenerated whenever the schema changes to prevent differences between the schema and TypeScript types.

## Step 12: Amenities Decision

ChatGPT and Gemini both recommended a controlled list of allowed amenities. Free text is flexible but may create inconsistent spelling, while a separate many-to-many structure would be unnecessarily complex for this small project. I chose a controlled list because it keeps the data consistent and makes property filtering easier.
