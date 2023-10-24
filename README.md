# LastCall

![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/mtoplak/LastCall) ![GitHub repo file count](https://img.shields.io/github/directory-file-count/mtoplak/LastCall) ![GitHub repo size](https://img.shields.io/github/repo-size/mtoplak/LastCall)

## Description

Last Call is an application that aims to facilitate sales and delivery planning for beverage manufacturers while providing an easy way for customers to search for and order drinks for a specific location and day. The service primarily targets small, local beverage producers, helping them streamline their delivery operations. Customers include restaurants and bars that want to directly order beverages from the manufacturers. Additionally, individual customers who typically purchase larger quantities of drinks or prioritize delivery dates can also use the platform.

## Key Functionalities

##### Customer functionalities:

- Searching for products and sellers based on offer type, location and name
- Displaying sellers on a map
- Placing orders with specifying delivery location and time
- Order tracking
- Rating sellers
- Communication with sellers

##### Seller functionalities:

- Managing inventory
- Defining delivery conditions
- Confirming or rejecting individual orders
- Offering discounts on products
- Communication with customers through emails regarding deliveries


## Tech Stack

<div style="width: 100%; text-align: center;">

| React | TypeScript | NestJS | MongoDB | Firebase | Docker |
| :---: | :--------: | :----: | :-----: | :------: | :----: |
| <a href="https://react.dev/" title="React"><img src="https://github.com/get-icon/geticon/raw/master/icons/react.svg" alt="React" width="50px" height="50px"></a> | <a href="https://www.typescriptlang.org/" title="Typescript"><img src="https://github.com/get-icon/geticon/raw/master/icons/typescript-icon.svg" alt="Typescript" width="50px" height="50px"></a> | <a href="https://nestjs.com/" title="NestJS"><img src="https://github.com/get-icon/geticon/raw/master/icons/nestjs.svg" alt="NestJS" width="50px" height="50px"></a> | <a href="https://www.mongodb.com/" title="MongoDB"><img src="https://github.com/get-icon/geticon/raw/master/icons/mongodb.svg" alt="MongoDB" width="80px" height="50px"></a> | <a href="https://www.firebase.com/" title="Firebase"><img src="https://github.com/get-icon/geticon/raw/master/icons/firebase.svg" alt="Firebase" width="50px" height="50px"></a> | <a href="https://www.docker.com/" title="Docker"><img src="https://github.com/get-icon/geticon/raw/master/icons/docker-icon.svg" alt="Docker" width="50px" height="50px"></a> |

</div>


## Installation and usage

Install `node_modules` in the root directory

```
yarn
```

Build the `@core/lib` first.

```
yarn build:lib
```

Create `.env.dev` and `.env.prod` files in the `apps/fastify-server` directory with the following content:

```env
 DATABASE_URI = "mongodb+srv://<username>:<password>@lastcall.apyanwb.mongodb.net/?retryWrites=true&w=majority"
 FIREBASE_PROJECT_ID=<project-id>
 MAILER_PASS=<password>
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

Frontend is available at `localhost:3000`, backend is available at `localhost:4000`.

## Docker

### Build backend image only

Run these commands in the root directory:

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

Run these commands in the root directory:

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

## Test

### Frontend

Run in `frontend` directory:

```
npm run test
```


## Project Structure

```bash
├───_PROMOCIJA (promotion)
├───.husky
├───.yarn
│   └───releases
├───apps
│   ├───fastify-server
│   │   ├───dist
│   │   │   └───app
│   │   │       ├───authentication
│   │   │       ├───buyers
│   │   │       ├───cart
│   │   │       ├───distance
│   │   │       ├───guards
│   │   │       ├───mailer
│   │   │       ├───orders
│   │   │       ├───products
│   │   │       ├───sellers
│   │   │       └───utils
│   │   ├───src
│   │   │   └───app
│   │   │       ├───authentication
│   │   │       ├───buyers
│   │   │       ├───cart
│   │   │       ├───distance
│   │   │       ├───guards
│   │   │       ├───mailer
│   │   │       ├───orders
│   │   │       ├───products
│   │   │       ├───sellers
│   │   │       └───utils
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
│           │   ├───core
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

## Authors

- [Maša Toplak](https://github.com/mtoplak)
- [Elena U. Bežan](https://github.com/ElenaBezan)
- [Tia Žvajker](https://github.com/tiazv)