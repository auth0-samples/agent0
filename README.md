## What is Agent0

A full stack demo app for First party Tool calling for AI Agent.

![Agent0](/docs/agent0.png "Agent0 Logo")

Follow [this link](/docs/agent0.md) to learn more about Agent0.

## Pre-requisites

- [Auth0 tenant domain](https://manage.auth0.com)
- Auth0 SPA client ID with its callback, logout URIs set to `http://localhost:8080`
- [API created in auth0 tenant](https://auth0.com/docs/get-started/auth0-overview/set-up-apis) with identifier configured as `agent0-api`
- [OpenAI API Key](https://platform.openai.com/api-keys)
- Node version 22

## Installation

Rename `.env.example` file to `.env` and replace `AUTH0_DOMAIN`, `AUTH0_CLIENT_ID` and `OPENAPI_API_KEY` with relevant values

Install dependencies for API

```
cd server
npm i
cd ..
```

Install dependencies for SPA

```
cd client
npm i
cd ..
```

## Running Agent0

### Server

Open a new terminal window and execute `npm run server`

### Client

Open a new terminal window and execute `npm run client`

## Login to Agent0

Open [http:localhost:8080](http://localhost:8080) and SignUp to start using Agent0

To test the first party Tool Calling, try

> "Who am I? Give me all the details you have"
