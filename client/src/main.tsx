import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Root from "./routes/root";
import Home from "./routes/home";
import About from "./routes/about";
import Login, {
  action as loginAction,
  loader as loginLoader,
} from "./routes/login";
import SignUp, { action as signUpAction } from "./routes/signUp";
import Dashboard, { loader as dashboardLoader } from "./routes/dashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute, { loader as privateLoader } from "./routes/private";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
        loader: loginLoader,
        action: loginAction,
      },
      {
        path: "signup",
        element: <SignUp />,
        action: signUpAction,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
  {
    path: "/user",
    element: <PrivateRoute />,
    loader: privateLoader,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
        loader: dashboardLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
