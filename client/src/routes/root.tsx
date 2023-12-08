import { Outlet } from "react-router-dom";

function Root() {
  return (
    <div>
      <div className="navbar-fixed">
        <div className="navbar">
          <div className="navbar-content">
            <h2 className="navbar-title">BLAH-GING</h2>
            <div className="navbar-empty"></div>
            <div className="navbar-links">
              <p className="navbar-item">
                <a href="">About</a>
              </p>
              <p className="navbar-item">
                <a href="">Sign in</a>
              </p>
              <p className="navbar-item">
                <a href="">Sign up</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Root;
