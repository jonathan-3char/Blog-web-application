import express from "express";
import "dotenv/config";
import cors from "cors";
import * as db from "./db/index.js";
import bcrypt from "bcrypt";

const app = express();

const port = process.env.PORT || 8000;

app.use(cors());
// Recognize incoming request bodies as JSON objects
app.use(express.json());

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
      "SELECT email, password FROM blog_accounts WHERE email = $1";
    const emailResult = await client.query(emailQuery, [email]);

    if (emailResult.rows.length === 0) {
      res.status(400).json({ error: "Email or password incorrect" });
      return;
    }

    const hash = emailResult.rows[0].password;
    const validPassword = await bcrypt.compare(password, hash);
    client.release();

    res.send(validPassword);
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
