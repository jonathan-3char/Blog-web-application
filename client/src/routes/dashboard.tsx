import { useState } from "react";
import { redirect, useLoaderData } from "react-router-dom";

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

function Dashboard() {
  const recentBlog = <div>For recent blog</div>;
  const following = <div>Following content</div>;
  const myBlogs = <div>My own blogs</div>;
  const [view, setView] = useState("recent");
  const { name } = useLoaderData() as SignUpData;

  const hashMap = new Map([
    ["recent", recentBlog],
    ["following", following],
    ["my", myBlogs],
  ]);

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
          {hashMap.get(view)}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
