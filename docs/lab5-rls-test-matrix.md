\# Lab 5 RLS Test Matrix



\## Test Results



| User role | Test | Expected result | Actual result | Status |

|---|---|---|---|---|

| Anonymous | Read properties | Only approved properties are visible | 1 property visible | Pass |

| Anonymous | Read sponsors | Only active sponsors are visible | 1 sponsor visible | Pass |

| Owner | Read owned and public records | Owner can see both of their properties and sponsors | 2 properties and 2 sponsors visible | Pass |

| Owner | Update own unapproved property | Update is allowed | Cedar Avenue Draft Condo was returned | Pass |

| Other user | Read records | Only public records are visible | 1 property and 1 sponsor visible | Pass |

| Other user | Update owner's unapproved property | Update is blocked | No rows returned | Pass |

| Service role | Read all records | All records are visible | 2 properties and 2 sponsors visible | Pass |



\## Test Notes



\- All tests used fictional accounts and fictional property data.

\- Each write test was placed inside a transaction and ended with ROLLBACK.

\- The service role is intended only for trusted server-side code.

\- No passwords, API keys, or other secrets were recorded in this file.

