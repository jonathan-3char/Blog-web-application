import * as db from "../config/database.js";

export async function displayName(req, res) {
  const nameQuery = "SELECT display_name FROM blog_accounts WHERE id = $1";

  try {
    const result = await db.query(nameQuery, [req.session.user]);

    if (result.rows.length === 0) {
      res.status(400).json({ error: "Something went wrong" });
      return;
    }

    res.json({ name: `Welcome, ${result.rows[0].display_name}` });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err });
  }
}

export function noSession(req, res) {
  res.json({ name: "You are not signed in" });
}