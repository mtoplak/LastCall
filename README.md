# LastCall

## Installation and usage

Install `node_modules` in the root directory

```
yarn
```

Build the `@core/lib` first.

```
yarn build:lib
```

Create `.env.dev` and `.env.prod` files in the `apps/fastify-backend` directory with the following content:

```env
 DATABASE_URI = "mongodb+srv://<username>:<password>@lastcall.apyanwb.mongodb.net/?retryWrites=true&w=majority"
```

Create `.env.dev` and `.env.prod` files in the `apps/frontend` directory with the following content:

```env
REACT_APP_API_URL=http://localhost:4000
REACT_APP_FIREBASE_API_KEY=<api-key>
REACT_APP_FIREBASE_AUTH_DOMAIN=<auth-domain>
REACT_APP_FIREBASE_PROJECT_ID=<project-id>
REACT_APP_FIREBASE_STORAGE_BUCKET=<storage-bucket>
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<messaging-sender-id>
REACT_APP_FIREBASE_APP_ID=<firebase-app-id>
REACT_APP_FIREBASE_MEASUREMENT_ID=<measurement-id>
```

Run the `frontend` and `fastify-server` in one command thanks to [Turborepo's Pipelines](https://turborepo.org/docs/core-concepts/pipelines)

```
yarn dev
```

## Docker

...