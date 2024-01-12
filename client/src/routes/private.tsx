import { Link, Outlet, redirect, useNavigate } from "react-router-dom";

export async function loader() {
  const url = "http://localhost:3000/user/displayName";
  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  if (response.ok) {
    const result = await response.json();

    if (result.name === undefined) {
      return redirect("/login");
    } else {
      return null;
    }
  }

  return redirect("/login");
}

function PrivateRoute() {
  const navigate = useNavigate();

  async function logout() {
    const url = "http://localhost:3000/session/logout";
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      const result = await response.json();

      if (result.error === undefined) {
        navigate("../..");
      }
    }
  }
  return (
    <div>
      <div className="navbar-fixed">
        <div className="navbar">
          <div className="navbar-content">
            <h2 className="navbar-title">BLAH-GING</h2>
            <div className="navbar-empty"></div>
            <div className="navbar-links">
              <p className="navbar-item">
                <Link to="about">About</Link>
              </p>
              <p className="navbar-item">
                <Link to="dashboard">Home</Link>
              </p>
              <p className="navbar-item">
                <Link to="createPost">Create Post</Link>
              </p>
              <p className="navbar-item">
                <span onClick={() => logout()} className="logout">
                  Logout
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default PrivateRoute;
