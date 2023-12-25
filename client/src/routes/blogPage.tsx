import { redirect, useLoaderData } from "react-router-dom";
import { marked } from "marked";

interface BlogData {
  title: string;
  author: string;
  html: string;
}

export async function loader({ params }) {
  const url = `http://localhost:3000/blog/${params.id}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    const blogResult = await response.json();

    if (blogResult.error !== undefined) {
      console.error(blogResult.error);
      return null;
    }

    const html = marked.parse(blogResult.content);
    const { title, author } = blogResult;
    return { title, author, html };
  } catch (err) {
    console.error(err);
    redirect("/user/dashboard");
  }
}

function BlogPage() {
  const { title, author, html } = useLoaderData() as BlogData;

  return (
    <div className="page">
      <div className="center-page">
        <h1>{title}</h1>
        <span>
          By:{" "}
          <a className="author" href="">
            {author}
          </a>
        </span>
        <hr />
        {<div dangerouslySetInnerHTML={{ __html: html }}></div>}
      </div>
    </div>
  );
}

export default BlogPage;
