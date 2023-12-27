import RedisStore from "connect-redis";
import session from "express-session";
import { createClient } from "redis";
import "dotenv/config";

const redisClient = createClient();
redisClient.connect().catch(console.error);

const redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp",
});

export const sessionConfig = session({
  store: redisStore,
  secret: process.env.REDISSECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    path: "/",
    secure: false,
    domain: process.env.COOKIEDOMAIN,
  },
});
