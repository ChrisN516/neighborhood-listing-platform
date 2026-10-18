\# Lab 5 AI Collaboration Log



Date: October 17, 2026



\## Google AI Studio



Prompt summary:

I asked AI Studio to create PostgreSQL DDL for profiles, properties, sponsors, property\_sponsors, and inquiries. I required UUID keys, foreign keys, required fields, check constraints, timestamps, safe delete behavior, indexes, and an updated\_at trigger. I told it not to include seed data, RLS policies, or credentials.



Useful suggestions:

\- UUID primary keys

\- Foreign-key relationships

\- Field validation with CHECK constraints

\- created\_at and updated\_at timestamps

\- An updated\_at trigger

\- Indexes for common searches

\- SET NULL for the profile connected to an inquiry



Rejected or changed suggestions:

\- Properties did not include an approved field.

\- Property ownership was allowed to be empty.

\- Sponsor ownership was allowed to be empty.

\- Ownership column names did not match the ER diagram.

\- The property\_sponsors table used a separate ID instead of the combined property and sponsor key.



\## ChatGPT Review



ChatGPT reviewed the generated SQL against the ER diagram and Lab 5 requirements. The review identified the ownership, approval, and junction-table changes listed above. The SQL was not run before this review.



\## Verification



The final migration will be checked for:

\- Primary and foreign keys

\- Required fields

\- Check constraints

\- Timestamps

\- Safe delete behavior

\- Row-level security

\- Successful access and denial tests



No passwords, API keys, database URLs, or other credentials were shared with either AI tool.



Commit:

Pending until the migration and security tests are completed.



\## Final Implementation and Testing



AI assistance was used to review the database design, troubleshoot the Supabase connection, create validation rules, and explain the Git Bash commands. I reviewed the suggestions and tested the results before including them.



Completed work:

\- Created and applied the Supabase migrations.

\- Added row-level security policies.

\- Tested allowed and forbidden database access.

\- Created protected GET, POST, and PATCH API routes.

\- Added Zod validation for submitted property data.

\- Added loading, empty, error, and success UI states.

\- Confirmed that unapproved listings are hidden from anonymous users.

\- Confirmed that unauthenticated write requests return a 401 response.

\- Confirmed that `.env.local` is ignored and no secret keys were found in project files.



Final verification:

\- ESLint completed without errors.

\- TypeScript compiled without errors.

\- The live property listing displayed successfully.



Commit status:

Ready for final commit and pull request.

