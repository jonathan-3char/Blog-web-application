import { Form, redirect, useActionData } from "react-router-dom";

interface SignUpErrors {
  message: string;
}

export async function action({ request }: { request: Request }) {
  try {
    const formData: FormData = await request.formData();
    const jsonData = Object.fromEntries(formData);
    const value = JSON.stringify(jsonData);
    const url = "http://localhost:3000/session/signup";

    const response: Response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: value,
    });

    const message = await response.json();
    if (message.error === undefined) {
      console.log("we got the message from the backend");
      return redirect("../user/dashboard");
    } else {
      return { message: message.error };
    }
  } catch (error) {
    return { message: "Sign up issue" };
  }
}

function SignUp() {
  const errors = useActionData() as SignUpErrors;

  return (
    <div className="sign-page">
      <div className="center-page">
        <h3 className="error-message">{errors?.message}</h3>
        <Form method="POST">
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" id="name" required />
          <label htmlFor="displayName">Display Name:</label>
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
