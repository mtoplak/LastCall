# LastCall

## Installation

Install dependencies:

```
cd frontend
npm install

cd ../backend
npm install
```

Create a `.env` file in the `backend` directory with the following content:

```env
 DATABASE_URI=mongodb+srv://<username>:<password>@cluster0.g1ftw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```

Create a `.env` file in the `frontend` directory with the following content:

```env
REACT_APP_API_URL=http://localhost:4000
```

## Usage

### Development

Start client:

`npm start`

Start server:

`npm run start` or `npm run start:dev` (watch mode)
