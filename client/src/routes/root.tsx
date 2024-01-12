import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";

function Root() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const url = "http://localhost:3000/user/displayName";
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const result = await response.json();
        if (result.name === undefined) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      }
    }
    checkSession();
  }, [setLoggedIn]);

  const loggedInView = (
    <div className="navbar-links">
      <p className="navbar-item">
        <a href="about">About</a>
      </p>
      <p className="navbar-item">
        <a href="login">Log in</a>
      </p>
      <p className="navbar-item">
        <a href="signup">Sign up</a>
      </p>
    </div>
  );
  const notLoggedInView = (
    <div className="navbar-links">
      <p className="navbar-item">
        <a href="about">About</a>
      </p>
      <p className="navbar-item">
        <Link to="dashboard">Home</Link>
      </p>
      <p className="navbar-item">
        <button>Logout</button>
      </p>
    </div>
  );

  return (
    <div>
      <div className="navbar-fixed">
        <div className="navbar">
          <div className="navbar-content">
            <h2 className="navbar-title">BLAH-GING</h2>
            <div className="navbar-empty"></div>
            {isLoggedIn ? loggedInView : notLoggedInView}
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Root;
