import { Form, redirect, useActionData } from "react-router-dom";

type LoginErrors = {
  message: string;
};

export async function loader() {
  const url = "http://localhost:3000/user/displayName";
  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  const result = await response.json();
  if (result.error === undefined) {
    return redirect("/user/dashboard");
  }
  return null;
}

export async function action({ request }: { request: Request }) {
  try {
    const formData: FormData = await request.formData();
    const jsonData = Object.fromEntries(formData);
    const value = JSON.stringify(jsonData);
    const url = "http://localhost:3000/session/login";

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
    if (message.error === undefined) {
      return redirect("/user/dashboard");
    } else {
      return { message: "Username or Password incorrect" };
    }
  } catch (error) {
    return { message: "Login issue" };
  }
}

function Login() {
  const errors = useActionData() as LoginErrors;

  return (
    <div className="login-page">
      <div className="center-page">
        <h3 className="error-message">{errors?.message}</h3>
        <Form method="POST">
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" id="username" required />
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" required />
          <button type="submit">Log in</button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
