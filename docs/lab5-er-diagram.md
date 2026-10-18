\# Lab 5 Database ER Diagram



This database supports property listings, local sponsors, user profiles, and property inquiries.



```mermaid

erDiagram

    PROFILES ||--o{ PROPERTIES : owns

    PROFILES ||--o{ SPONSORS : owns

    PROFILES o|--o{ INQUIRIES : submits

    PROPERTIES ||--o{ PROPERTY\_SPONSORS : includes

    SPONSORS ||--o{ PROPERTY\_SPONSORS : supports

    PROPERTIES ||--o{ INQUIRIES : receives



    PROFILES {

        uuid id PK

        text display\_name

        text role

        timestamptz created\_at

        timestamptz updated\_at

    }



    PROPERTIES {

        uuid id PK

        uuid owner\_id FK

        text title

        text street\_address

        text city

        text state

        text zip\_code

        numeric price

        integer bedrooms

        numeric bathrooms

        integer square\_feet

        text listing\_status

        boolean approved

        text image\_url

        timestamptz created\_at

        timestamptz updated\_at

    }



    SPONSORS {

        uuid id PK

        uuid owner\_id FK

        text business\_name

        text website\_url

        text description

        boolean active

        timestamptz created\_at

        timestamptz updated\_at

    }



    PROPERTY\_SPONSORS {

        uuid property\_id PK, FK

        uuid sponsor\_id PK, FK

        timestamptz created\_at

    }



    INQUIRIES {

        uuid id PK

        uuid property\_id FK

        uuid profile\_id FK

        text name

        text email

        text message

        timestamptz created\_at

    }

```



\## Relationship Summary



\- One profile can own multiple properties.

\- One profile can own multiple sponsor records.

\- Properties and sponsors have a many-to-many relationship through `property\_sponsors`.

\- One property can receive multiple inquiries.

\- An inquiry may be connected to a signed-in profile.

