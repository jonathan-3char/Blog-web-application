import * as db from "../db/index.js";
import bcrypt from "bcrypt";

export async function login(req, res) {
  const { username, password } = req.body;

  if (
    username === undefined ||
    username.length === 0 ||
    password === undefined ||
    password === 0
  ) {
    res.status(400).json({ error: "Bad Request" });
    return;
  }

  try {
    const client = await db.getClient();
    const query =
      "SELECT username, password, id FROM blog_accounts WHERE username = $1";
    const result = await client.query(query, [username]);

    if (result.rows.length === 0) {
      res.status(400).json({ error: "No Access" });
      return;
    }
    const hash = result.rows[0].password;
    const validPassword = await bcrypt.compare(password, hash);
    client.release();

    if (validPassword) {
      req.session.regenerate((err) => {
        if (err) {
          console.error(err);
          res.json({ error: err });
          return;
        }

        req.session.user = result.rows[0].id;

        req.session.save((err) => {
          if (err) {
            res.status(400).json({ error: err });
            return;
          }
          res.json({ message: "You are logged in" });
        });
      });
    } else {
      res.status(400).json({ error: "No Access" });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Something went wrong" });
    return;
  }
}

/* User controller that handles a client request to create an account.
 * The email and username must be not taken from another user.
 */
export async function signUp(req, res) {
  const { username, displayName, password, email } = req.body;

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

  res.json({ message: "Login in now" });
}

export async function logout(req, res) {
  req.session.user = null;
  req.session.save((err) => {
    if (err) {
      res.status(400).json({ err: err });
      return;
    }

    req.session.regenerate((err) => {
      if (err) {
        res.status(400).json({ err: err });
        return;
      }
      res.json({ message: "Logged out" });
    });
  });
}
