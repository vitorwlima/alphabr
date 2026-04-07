# Alpha BR

This project is a tool to have the source of truth about the open-market data of brazilian companies.

## Tech stack

We use Bun and the most modern tooling around it.

## Ideal workflow

1. Download the raw data from the CVM
2. Extract the zip data
3. Parse the data into a structured format by company and time
4. Store the data in a database (can be a local SQLite for now)
