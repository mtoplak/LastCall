# LastCall

![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/mtoplak/LastCall) ![GitHub repo file count](https://img.shields.io/github/directory-file-count/mtoplak/LastCall) ![GitHub repo size](https://img.shields.io/github/repo-size/mtoplak/LastCall)

## Description

Last Call is an application that aims to facilitate the sales and delivery planning for beverage manufacturers while providing an easy way for customers to search for and order drinks for a specific location and day. The service primarily targets small, local beverage producers, helping them streamline their delivery operations. Customers include restaurants and bars that want to directly order beverages from the manufacturers. Additionally, individual customers who typically purchase larger quantities of drinks or prioritize delivery dates can also use the platform.

## Tech Stack

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [NestJS](https://nestjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Firebase](https://firebase.google.com/)
- [Docker](https://www.docker.com/)


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

### Build backend image only

Run these commands the root directory:

#### Build image

```
docker build -t backend-image -f Dockerfile.backend .
```

#### Run image

``` 
docker run -p 8080:4000 backend-image
```

Available at `localhost:8080`.


### Build frontend image only

Run these commands the root directory:

#### Build image

```
docker build -t frontend-image -f Dockerfile.frontend .
```

#### Run image

```
docker run -p 3000:80 frontend-image
```

Available at `localhost:3000`.


### Start all services

```
docker-compose up
```


## Project Structure

```bash
├───.husky
├───.yarn
│   ├───cache
│   └───releases
├───apps
│   ├───fastify-server
│   │   ├───dist
│   │   │   └───app
│   │   │       ├───authentication
│   │   │       ├───buyers
│   │   │       ├───guards
│   │   │       ├───orders
│   │   │       ├───products
│   │   │       └───sellers
│   │   ├───src
│   │   │   └───app
│   │   │       ├───authentication
│   │   │       ├───buyers
│   │   │       ├───orders
│   │   │       ├───products
│   │   │       └───sellers
│   │   └───test
│   └───frontend
│       ├───build
│       │   └───static
│       │       ├───css
│       │       ├───js
│       │       └───media
│       ├───node_modules
│       ├───public
│       └───src
│           ├───assets
│           │   ├───icons
│           │   ├───images
│           │   └───styles
│           ├───components
│           │   ├───404
│           │   ├───buyer
│           │   │   └───login
│           │   ├───homepage
│           │   ├───routing
│           │   ├───seller
│           │   │   └───login
│           │   └───ui
│           ├───context
│           ├───constants
│           ├───models
│           ├───pages
│           ├───services
│           └───utils
├───node_modules
└───packages
    └───core-lib
        ├───build
        │   └───ui
        └───src
            └───ui

```
