import { useLoaderData } from "react-router-dom";
import BlogThumbnail from "../components/BlogThumbnail";

interface BlogThumbnailProps {
  title: string;
  author: string;
  id: string;
}

export async function loader() {
  const url = "http://localhost:3000/blog/tenLatestBlogs";
  try {
    const response = await fetch(url);

    const result = await response.json();

    if (result.blogs === undefined) {
      console.error(result.error);
      return null;
    }

    const thumbnails = result.blogs.map((blog: BlogThumbnailProps) => {
      return (
        <BlogThumbnail
          title={blog.title}
          author={blog.author}
          key={blog.id}
          id={blog.id}
        />
      );
    });

    return thumbnails;
  } catch (err) {
    console.error(err);
    return null;
  }
}

function Home() {
  const thumbnails = useLoaderData() as ReactNode;
  return (
    <div className="page-container">
      <div className="home-welcome">
        <div className="welcome-container">
          <h1>BLAH-GING</h1>
          <p>
            On this website you can view the blog post from other users and even
            create your own! Explore different types of interest and learn from
            people's post. Or share your thoughts or ideas so others can see
            them!
          </p>
          <p>
            Blogs are made through markdown by the blogger. This makes it easy
            to get started and allows for interesting articles and makes the
            viewing experience comfortable for everyone.
          </p>
        </div>
      </div>
      <div className="home-container">{thumbnails}</div>
    </div>
  );
}

export default Home;
