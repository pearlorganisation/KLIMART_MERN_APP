##Klimart Backend
> Klimart Backend consist of all the backend API 

## Features

> CRUD (Create, Read, Update And Delete)

- Authentication with JWT (Reset Password with email)
  - Login (User/Admin)
  - Register
  - Forgot Password
- Admin Routes
  - CRUD Operations questions and options
  - CRUD operations for categories
  - CRUD operations for users
- Pagination and search where necessary
- API Security (NoSQL Injections, XSS Attacks, http param pollution etc)
-Project (CRUD)
-Pages (CRUD)
  Blog (CRUD)

## Requirement

- NodeJS
- MongoDB

## Configuration File



```ENV
PORT =  8081
MONGO_DB_URL = mongodb+srv://amit:amit@cluster0.nzlwx9h.mongodb.net/Klimart?retryWrites=true&w=majority

JWT_SECRET=megha
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30

FILE_UPLOAD_PATH = ./public/uploads
MAX_FILE_UPLOAD = 1000000

SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_EMAIL=
SMTP_PASSWORD=
FROM_EMAIL=noreply@quizapp.com
FROM_NAME=QuizzApp
```

Email testing: use mailtrap for email testing, it's easy no stress.

## Installation

Install all npm dependecies

```console
npm install
```

Install nodemon globally

```console
npm install -g nodemon
```

## Start web server

```console
node run dev
```
