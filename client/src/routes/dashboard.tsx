import { useState } from "react";

type viewState = "recent" | "following" | "my";

// NOTE: Have three async functions that will load said data will have to use useEffect

function Dashboard() {
  const recentBlog = <div>For recent blog</div>;
  const following = <div>Following content</div>;
  const myBlogs = <div>My own blogs</div>;
  const [view, setView] = useState("recent");

  const hashMap = new Map([
    ["recent", recentBlog],
    ["following", following],
    ["my", myBlogs],
  ]);

  return (
    <div className="dashboard-page">
      <div className="center-page">
        <div>
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
