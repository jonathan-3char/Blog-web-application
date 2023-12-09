import { Form, redirect } from "react-router-dom";

export async function action() {
  /* NOTE: send to back end to create account, get response saying if the
   * account was made
   */
  return redirect("../dashboard");
}

function SignUp() {
  return (
    <div className="sign-page">
      <div className="center-page">
        <Form method="POST">
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" id="name" required />
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" required />
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" required />
          <button type="submit">Sign up</button>
        </Form>
      </div>
    </div>
  );
}

export default SignUp;
