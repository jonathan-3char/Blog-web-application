import * as db from "../db/index.js";
import bcrypt from "bcrypt";

export async function login(req, res) {
  const { email, password } = req.body;
  let validPassword = false;

  if (
    email === undefined ||
    email.length === 0 ||
    password === undefined ||
    password === 0
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
    validPassword = await bcrypt.compare(password, hash);
    client.release();

    if (validPassword) {
      req.session.regenerate((err) => {
        if (err) {
          console.error(err);
          res.json({ error: err });
          return;
        }

        req.session.user = emailResult.rows[0].id;

        req.session.save((err) => {
          if (err) {
            res.json({ error: err });
            return;
          }
          res.redirect("/user/displayName");
        });
      });
    } else {
      res.json({ name: "Wrong" });
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
