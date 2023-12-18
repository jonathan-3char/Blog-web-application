import RedisStore from "connect-redis";
import session from "express-session";
import { createClient } from "redis";

const redisClient = createClient();
redisClient.connect().catch(console.error);

const redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp",
});

export const sessionConfig = session({
  store: redisStore,
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: false,
  cookie: {
    path: "/",
    secure: false,
    domain: "localhost",
  },
});
