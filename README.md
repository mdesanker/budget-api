# Budget App API

A tracking app for budget and expenses.

The [Budget App]()

## Table of Contents

- [Description](#Description)
- [How to set up locally](#How-to-set-up-locally)
- [Built with](#Built-with)
- [Lessons learned](#Lessons-learned)
- [Links](#Links)

## Description

This is the API for the [Budget App]().

This app is designed to allow users to track their expenses for different categories, such as housing, food, bills & utilities, and so on to help with budgeting. Users can also track expenses to help them understand where and what their largest expenses are, which can be helpful for developing plans to increase spending.

## How to set up locally

```bash
git clone git@github.com:mdesanker/errand-tracker-api.git
cd errand-tracker-api
npm install
npm run serverstart
```

Running this API locally will require you to create a .env file in the root directory with the following variables:

```bash
DEV_PORT={{server port}}
DEV_DB_URI={{MongoDB URI}}
KEY={{JWT key}}
```

To run all tests, remove the path. To run tests for a specific file, modify path in `test` script with desired fileName:

```json
"test": "cross-env NODE_ENV=test jest ./routes/__test__/user.test.js --testTimeout=10000 --detectOpenHandles --forceExit",
```

```bash
npm test
```

## Built with

- TypeScript
- NodeJS
- ExpressJS
- JWT Authentication
- MongoDB/Mongoose
- supertest

## Lessons learned

## Links
