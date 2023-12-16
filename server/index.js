import express from "express";
import "dotenv/config";
import cors from "cors";
import * as db from "./db/index.js";
import bcrypt from "bcrypt";
import session from "express-session";
import RedisStore from "connect-redis";
import { createClient } from "redis";

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
// Initialize client
const redisClient = createClient();
redisClient.connect().catch(console.error);

// Initialize store
const redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
});

const port = process.env.PORT || 8000;

// Recognize incoming request bodies as JSON objects
app.use(
  session({
    store: redisStore,
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: {
      path: "/",
      secure: false,
      domain: "localhost",
    },
  }),
);

// NOTE: should probably put middleware in its own folder or file
function isAuthenticated(req, res, next) {
  // assuming this is checking to see if that user exist in the database
  if (req.session.user) {
    next();
  } else {
    next("route");
  }
}

app.get("/test", isAuthenticated, (req, res) => {
  res.json({ name: `hello, ${req.session.user}` });
});

app.get("/test", (req, res) => {
  res.json({ name: "You are not signed in" });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (
    email === undefined ||
    email.length === 0 ||
    password === undefined ||
    password.length === 0
  ) {
    res.status(400).json({ error: "Bad Request" });
    return;
  }

  try {
    const client = await db.getClient();
    const emailQuery =
      "SELECT email, password, id FROM blog_accounts WHERE email = $1";
    const emailResult = await client.query(emailQuery, [email]);

    if (emailResult.rows.length === 0) {
      res.status(400).json({ error: "Email or password incorrect" });
      return;
    }

    const hash = emailResult.rows[0].password;
    const validPassword = await bcrypt.compare(password, hash);
    client.release();

    if (validPassword) {
      req.session.regenerate((err) => {
        if (err) {
          console.error(err);
          res.json({ error: err });
          return;
        }

        // store user information in session
        req.session.user = emailResult.rows[0].id;
        // save the session before redirection to ensure page
        // load does not happen before session is saved
        req.session.save((err) => {
          if (err) {
            console.error(err);
            res.json({ error: err });
            return;
          }
          res.redirect("/test");
        });
      });
    } else {
      res.json({ name: "wrong" });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err });
  }
});

app.post("/signup", async (req, res) => {
  const { username, displayName, password, email } = req.body;
  // check username and email have not been used

  try {
    const client = await db.getClient();
    const usernameQuery = "SELECT * FROM blog_accounts WHERE username = $1";
    const usernameResult = await client.query(usernameQuery, [username]);

    if (usernameResult.rows.length !== 0) {
      res.status(401).json({ error: "Username taken" });
      return;
    }

    const emailQuery = "SELECT * FROM blog_accounts WHERE email = $1";
    const emailResult = await client.query(emailQuery, [email]);

    if (emailResult.rows.length !== 0) {
      res.status(401).json({ error: "Email taken" });
      return;
    }

    // encrypt password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    const insertQuery =
      "INSERT INTO blog_accounts (username, display_name, email, password) VALUES ($1, $2, $3, $4)";
    client.query(insertQuery, [username, displayName, email, hash]);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err });
    return;
  }

  res.json({ message: "user was created" });
});

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
