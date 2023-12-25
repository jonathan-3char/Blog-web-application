import { Form, redirect } from "react-router-dom";

export async function action({ request }: { request: Request }) {
  try {
    const url = "http://localhost:3000/user/createPost";
    const formData = await request.formData();
    console.log(formData);
    const jsonData = Object.fromEntries(formData);
    const value = JSON.stringify(jsonData);
    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: value,
    });

    const result = await response.json();
    if (result.error === undefined) {
      console.log("We go the blog set up");
      return redirect("/user/dashboard");
    }
  } catch (err) {
    console.error(err);
    return null;
  }
  return null;
}

function CreatePost() {
  return (
    <div className="page">
      <div className="center-page">
        <Form method="POST" className="blog-content">
          <label htmlFor="title">Title:</label>
          <input name="title" id="title" type="text" />
          <label htmlFor="content">
            <b>Content:</b>
          </label>
          <textarea id="content" name="content"></textarea>
          <button type="submit">Submit</button>
        </Form>
      </div>
    </div>
  );
}

export default CreatePost;
