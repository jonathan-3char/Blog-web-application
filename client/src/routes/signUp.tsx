import { Form, redirect } from "react-router-dom";

export async function action({ request }: { request: Request }) {
  /* NOTE: send to back end to create account, get response saying if the
   * account was made
   */
  const formData: FormData = await request.formData();
  const jsonData = Object.fromEntries(formData);
  const value = JSON.stringify(jsonData);
  const url = "http://localhost:3000/signup";
  const response: Response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: value,
  });

  const message = await response.json();
  if (message.message === "user was created") {
    console.log("we got the message from the backend");
  }

  return redirect("../dashboard");
}

function SignUp() {
  return (
    <div className="sign-page">
      <div className="center-page">
        <Form method="POST">
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" id="name" required />
          <label htmlFor="displayName">Password:</label>
          <input type="text" name="displayName" id="displayName" required />
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
