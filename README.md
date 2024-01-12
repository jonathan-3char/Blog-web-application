# Full-stack blog application

## Preview

![Application preview](preview.gif =250x250)

## Goal

The goal of this project is to try to make a full-stack application. This is supposed to act as a blog website where users can create and view blogs.
The blogs are written in markdown by the creator and then will viewed in HTML for a better viewing experience.

## How it works

### Front end

[React](https://react.dev) with [Vite](https://react.dev) is being used. For routing [React Router v6](https://reactrouter.com/en/main) is being used.
Styling is done using just basic CSS.

### Back end

Routing is dealt with through [Express](https://expressjs.com). User sessions are managed through [express-session](https://www.npmjs.com/package/express-session).
The accounts and blogs are handled by [PostgreSQL](https://www.postgresql.org) while the user sessions are handled by [Redis](https://redis.io).

## Getting things started

As of writing this, this is not deployed on any website. To run this you have to run it locally, on localhost.

To setup the front end just go to **/client** then run:

```
npm run dev
```

To setup the back end first start up a postgres server, (this can be done with [docker](https://hub.docker.com/_/postgres))
then start up a redis server. This code uses .env files to store the configuration to create these so you will also have to do that.
Now you can go to **/server** then run:

```
npm run dev
```
