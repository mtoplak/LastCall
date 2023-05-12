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

Create a `.env.dev` and `.env.prod` file in the `apps/frontend` directory with the following content:

```env
REACT_APP_API_URL=http://localhost:4000
```

Run the `frontend` and `fastify-server` in one command thanks to [Turborepo's Pipelines](https://turborepo.org/docs/core-concepts/pipelines)

```
yarn dev
```

## Docker

...