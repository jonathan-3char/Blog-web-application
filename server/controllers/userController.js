import * as db from "../config/database.js";
import { nanoid } from "nanoid";

export async function displayName(req, res) {
  const nameQuery = "SELECT display_name FROM blog_accounts WHERE id = $1";

  try {
    console.log(req.session.user);
    const result = await db.query(nameQuery, [req.session.user]);

    if (result.rows.length === 0) {
      res.status(400).json({ error: "Something went wrong" });
      return;
    }

    res.json({ name: `Welcome, ${result.rows[0].display_name}` });
    return;
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err });
  }
}

export async function createPost(req, res) {
  try {
    const { title, content } = req.body;
    console.log(title, content);
    const client = await db.getClient();
    const query =
      "INSERT INTO blogs (id, author, title, content) VALUES \
    ($1, $2, $3, $4)";
    const authorQuery = "SELECT username FROM blog_accounts WHERE id = $1";
    const authorResult = await client.query(authorQuery, [req.session.user]);

    if (authorResult.rows.length === 0) {
      res.status(400).json({ error: "Something went wrong" });
      return;
    }
    const id = nanoid();
    await client.query(query, [
      id,
      authorResult.rows[0].username,
      title,
      content,
    ]);
    res.json({ message: "Blog was added" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Something went wrong" });
  }
}

// get all blogs written by requesting user
export async function allBlogs(req, res) {
  try {
    const client = await db.getClient();
    const query = "SELECT username FROM blog_accounts WHERE id = $1";
    const authorResult = await client.query(query, [req.session.user]);

    if (authorResult.rows.length === 0) {
      res.status(400).json({ error: "Something went wrong" });
      return;
    }
    const blogQuery = "SELECT * from blogs WHERE author = $1";
    const blogsResult = await client.query(blogQuery, [
      authorResult.rows[0].username,
    ]);

    if (blogsResult.rows.length === 0) {
      res.json({ message: "No blogs" });
      return;
    }

    res.json({ message: blogsResult.rows });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Something went wrong" });
  }
}

export function noSession(req, res) {
  res.json({ error: "You are not signed in" });
}
