# Budget App API

A tracking app for expenses.

The [Budget App](https://mdesanker.github.io/budget-frontend)

## Table of Contents

- [Description](#Description)
- [Motivation](#Motivation)
- [How to setup locally](#How-to-set-up-locally)
- [Built with](#Built-with)
  - [Frontend](#Frontend)
  - [Backend](#Backend)
- [Challenges](#Challenges)
- [Links](#Links)

## Description

This repository is the REST API backend for the [Budget App](https://mdesanker.github.io/budget-frontend).

This expense tracking app allows users to track expenses with amount, who money was sent to or received from, a description of what the transaction was for, a transaction category, and date of the transaction. The dashboard displays total expenses, and a list of individual transactions over a 7 or 30 day period.

The activity tracker tab shows a break down of transactions day-by-day over the last week, and month-by-month over the last year. Users can also look at their spending in each category over time periods of a week, month, or year.

## Motivation

This app was created as a practice exercise to use TypeScript with React and Express, and use Tailwind CSS.

## How to setup locally

```bash
git clone git@github.com:mdesanker/errand-tracker-api.git
cd errand-tracker-api
npm install
npm run dev
```

Running this API locally will require you to create a .env file in the root directory with the following variables:

```bash
DEV_PORT={{server port}}
DEV_DB_URI={{MongoDB URI}}
KEY={{JWT key}}
```

To run all tests, remove the path. To run tests for a specific file, modify path in `test` script with desired fileName:

```json
"test": "cross-env NODE_ENV=test jest ./routes/__test__/<test_filename>.test.ts --testTimeout=10000 --detectOpenHandles --forceExit",
```

```bash
npm test
```

## Built with

This app was built with the MERN stack in TypeScript.

### Frontend

- React
- React Router
- Redux
- Axios
- ChartJS
- Tailwind CSS

### Backend

- NodeJS
- ExpressJS
- JWT Authentication
- MongoDB/Mongoose
- supertest
- MongoMemoryServer

## Backend Challenges

- TypeScript took some getting used to (ongoing), but the ability to type check inputs is very useful.

- Figuring out how to add user id to the request object with declaration merging took quite a while.

- Added routes to track major expense data in snapshots that could be displayed in charts and used to develop a budget plan, but this was not implemented in the frontend.

## Links

- [Frontend Repository](https://github.com/mdesanker/budget-frontend)
