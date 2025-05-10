import { useSearchParams, useNavigate } from "react-router-dom";
import { authorblogs } from "../api/fetch";
import { useAuthorBlogs } from "../storeZustand/AurthorBlogs";
import { useEffect } from "react";

export function AuthorBlogs() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { authorBlogs, setAuthorBlogs } = useAuthorBlogs();
  const userId = searchParams.get("userId");

  async function handleClick() {
    const data = await authorblogs(userId);
    console.log(data);
    console.log(data.content);
    setAuthorBlogs(data.content);
  }

  useEffect(() => {
    handleClick();
    console.log(authorBlogs);
  }, []);

  const auth = localStorage.getItem("token");
  const isAuthenticated = auth && auth !== "null" && auth !== "undefined";

  return (
    <>
      {isAuthenticated ? (
        <button onClick={() => navigate("/blogs")}>Home</button>
      ) : (
        <button onClick={() => navigate("/")}>Home</button>
      )}
      {authorBlogs &&
        authorBlogs.map((blog) => (
          <ul key={blog._id}>
            <li>{blog.title}</li>
          </ul>
        ))}
    </>
  );
}
