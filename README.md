# Things 2 Trade Server

This is a repo for the Things 2 Trade App

## Prerequisites

This app requires Node.js v10.0+ to run.

## Installing
Install the dependencies and devDependencies and start the server.

```
npm install
```

### User

```js
{
  user_name: {
    type: String,
    required: True,
    Unique: True
  },
  Password: {
    type: String,
    required: True
  },
    full_name: String,
    required: True
}
```

### Trades

```
{
  Title: {
    type: String,
    required: True,
  },
  image1 & image2: {
    type: Url,
    required: True,
  }
  active: True
}
```

## Api Overview

```
/api
.
├── /auth
│   └── POST
│       ├── /login
│       └── /refresh
├── /users
│   └── POST
│       └── /
├── /Trades
│   ├── POST
│   └── GET
│       └── /
```

### POST `/api/auth/login`

```js
// req.body
{
  username: String,
  password: String
}

// res.body
{
  authToken: String
}
```

### POST `/api/auth/refresh`

```js
// req.header
Authorization: Bearer ${token}

// res.body
{
  authToken: ${token}
}
```

### POST `/api/users/`

```js
// req.body
{
  username: String,
  password: String
}

// res.body
{
  username: String,
  id: user_id
}
```

### POST `/api/trades`

```js
// req.header
Authorization: Bearer ${token}
// req.body
{
  title: [string],
  image1: [string/url],
  image2: [string/url]
}

//res.body
{
  id: user_id
  title: String,
  image1: Url/String
  Image2: Url/String
}
```

### GET `/api/trades`

```js
//req.header
Authorization: Bearer ${token}

//res.body
{
  id: trade_id
  title: String,
  image1: Url/String,
  image2: Url/String,
  Active: Boolean
}
```

## Technology Stacks
* [Node](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [JWT](https://jwt.io/)
* [Mocha](https://mochajs.org/) 
* [Chai](https://www.chaijs.com/)
* [PostgreSQL](https://www.postgresql.org)

## Authors

* **Jordon Carter** - *Full Stack* - [Jvymvn](https://github.com/Jvymvn)
