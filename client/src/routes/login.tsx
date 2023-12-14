import { Form } from "react-router-dom";

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
    headers: {
      "Content-Type": "application/json",
    },
    body: value,
  });

  const message = await response.text();

  console.log(message);
  return null;
}

function Login() {
  return (
    <div className="login-page">
      <div className="center-page">
        <Form method="POST">
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" id="name" required />
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" required />
          <button type="submit">Log in</button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
