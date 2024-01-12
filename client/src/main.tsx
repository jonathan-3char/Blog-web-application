import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Root from "./routes/root";
import Home, { loader as homeLoader } from "./routes/home";
import About from "./routes/about";
import Login, {
  action as loginAction,
  loader as loginLoader,
} from "./routes/login";
import SignUp, { action as signUpAction } from "./routes/signUp";
import Dashboard, { loader as dashboardLoader } from "./routes/dashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute, { loader as privateLoader } from "./routes/private";
import CreatePost, { action as createPostAction } from "./routes/createPost";
import BlogPage, { loader as blogPageLoader } from "./routes/blogPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: homeLoader,
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
      {
        path: "createPost",
        element: <CreatePost />,
        action: createPostAction,
      },
      {
        path: "blog/:id",
        element: <BlogPage />,
        loader: blogPageLoader,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
