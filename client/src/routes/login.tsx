import { Form, redirect } from "react-router-dom";

export async function action({ request }: { request: Request }) {
  /* NOTE: send request to the backend and then redirect the user to their
   * dashboard (this also means the navbar will have to change)
   */
  const formData: FormData = await request.formData();
  const jsonData = Object.fromEntries(formData);
  const value = JSON.stringify(jsonData);
  const url = "http://localhost:3000/login";

  const response: Response = await fetch(url, {
    method: "post",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: value,
  });

  const message = await response.json();
  console.log(message);
  if (message.name !== "You are not signed in") {
    return redirect("/dashboard");
  } else {
    return redirect("/login");
  }
}

function Login() {
  return (
    <div className="login-page">
      <div className="center-page">
        <Form method="POST">
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" required />
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" required />
          <button type="submit">Log in</button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
