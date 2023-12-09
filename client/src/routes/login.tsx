import { Form } from "react-router-dom";

export async function action({ request, params }) {
  /* NOTE: send request to the backend and then redirect the user to their
   * dashboard (this also means the navbar will have to change)
   */
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  alert(updates.username);

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
