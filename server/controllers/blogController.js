import * as db from "../config/database.js";

export async function viewBlog(req, res) {
  const query = "SELECT title, content, author FROM blogs WHERE id = $1";
  try {
    const response = await db.query(query, [req.params.blogId]);

    if (response.rows.length === 0) {
      res.status(404).json({ error: "This blog doesn't exist" });
      return;
    }

    const blogJSON = {
      title: response.rows[0].title,
      content: response.rows[0].content,
      author: response.rows[0].author,
    };

    res.json(blogJSON);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Something went wrong" });
  }
}

export async function viewLatestBlogs(req, res) {
  const query = "SELECT * FROM blogs LIMIT 10";
  try {
    const response = await db.query(query);

    if (response.rows.length === 0) {
      res.status(404).json({ error: "There are no blogs" });
      return;
    }

    res.json({ blogs: response.rows });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Something went wrong" });
  }
}
