import { useSearchParams, useNavigate } from "react-router-dom";
import { authorblogs } from "../api/fetch";
import { useState } from "react";

export function AuthorBlogs() {
  const navigate = useNavigate();
  const [authorBlogs, setAuthorBlogs] = useState([]);
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  async function handleClick() {
    const data = await authorblogs(userId);
    console.log(data);
    setAuthorBlogs(data.blogs);
  }
  const auth = localStorage.getItem("token");
  const isAuthenticated = auth && auth !== "null" && auth !== "undefined";

  return (
    <>
      {isAuthenticated ? (
        <button onClick={() => navigate("/blogs")}>Home</button>
      ) : (
        <button onClick={() => navigate("/")}>Home</button>
      )}
      <button onClick={handleClick}>Get blogs of author</button>
      {authorBlogs.map((blog) => (
        <ul key={blog._id}>
          <li>{blog.title}</li>
        </ul>
      ))}
    </>
  );
}
