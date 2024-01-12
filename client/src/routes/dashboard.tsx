import { useEffect, useState } from "react";
import { redirect, useLoaderData } from "react-router-dom";
import { loader as getRecentBlogs } from "./home";
import BlogThumbnail, { BlogThumbnailProps } from "../components/BlogThumbnail";

type SignUpData = {
  name: string;
};

export async function loader() {
  const url = "http://localhost:3000/user/displayName";
  try {
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    const message = await response.json();

    if (message.name === undefined) {
      return redirect("/login");
    }

    return message;
  } catch (err) {
    console.error(err);

    if (err instanceof Error) {
      return err.message;
    }

    redirect("/login");

    return String(err);
  }
}

async function usersBlogs() {
  const url = "http://localhost:3000/user/allBlogs";
  try {
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    const result = await response.json();

    if (result.message === undefined) {
      console.error(result.error);
      return null;
    }

    const thumbnails = result.message.map((blog: BlogThumbnailProps) => {
      return (
        <BlogThumbnail
          title={blog.title}
          author={blog.author}
          key={blog.id}
          id={blog.id}
        />
      );
    });

    return thumbnails;
  } catch (err) {
    console.error(err);
    return null;
  }
}

function Dashboard() {
  const [view, setView] = useState("recent");
  const [blogView, setBlogView] = useState(<div></div>);
  const { name } = useLoaderData() as SignUpData;

  useEffect(() => {
    async function fetchData() {
      let viewPage = null;
      if (view === "recent") {
        viewPage = await getRecentBlogs();
      } else if (view === "following") {
        viewPage = <div>Still in the works</div>;
      } else {
        viewPage = await usersBlogs();
      }
      setBlogView(viewPage);
    }
    fetchData();
  }, [view]);

  return (
    <div className="dashboard-page">
      <div className="center-page">
        <div>
          <h2 className="users-name">{name}</h2>
          <div className="dashboard-view-options">
            <button onClick={() => setView("recent")}>Recent blogs</button>
            <button onClick={() => setView("following")}>
              Blogs of following
            </button>
            <button onClick={() => setView("my")}>Your blogs</button>
          </div>
          {blogView}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
