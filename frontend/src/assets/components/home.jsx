import { useNavigate } from "react-router-dom";
import { Paginate } from "./paginate";

export function Home({
  blogs,
  setBlogs,
  getBlogs,
  totalPages,
  setCurrentPage,
  currentPage,
}) {
  const navigate = useNavigate();

  function redirect() {
    navigate("/signup");
  }

  function handleGetAuthor(userId) {
    navigate(`/author-blogs?userId=${userId}`);
  }

  function paginate(number) {
    setCurrentPage(number);
  }
  return (
    <>
      <button onClick={redirect}>Login</button>
      Home
      <button onClick={() => getBlogs(currentPage)}>Click</button>
      {blogs.map((blog) => (
        <ul key={blog._id}>
          <li>{blog.title}</li>
          <li>{blog.content}</li>
          <p>
            <b onClick={() => handleGetAuthor(blog.userId._id)}>author: </b>
            {blog.userId.name}
          </p>
        </ul>
      ))}
      <Paginate nPages={totalPages} paginate={paginate} />
      <button onClick={redirect}>create Blogs</button>
    </>
  );
}
