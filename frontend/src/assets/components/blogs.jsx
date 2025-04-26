import { useNavigate } from "react-router-dom";

export function Blogs({ blogs, setBlogs, getBlogs }) {
  const navigate = useNavigate();

  function createBlog() {
    navigate("/createblog");
  }
  function myblogs() {
    navigate("/myblogs");
  }
  function handleGetAuthor(userId) {
    navigate(`/author-blogs?userId=${userId}`);
  }
  function handleLogOut() {
    localStorage.removeItem("token");
  }
  return (
    <>
      <nav>
        <button onClick={handleLogOut}>Logout</button>
        <button onClick={myblogs}>MyBlogs</button>
      </nav>
      <div>
        <button onClick={getBlogs}>GetBlogs</button>

        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <ul key={blog._id}>
              <li>{blog.title}</li>
              <li>{blog.content}</li>
              <p onClick={() => handleGetAuthor(blog.userId._id)}>
                Author: {blog.userId.name}
              </p>
            </ul>
          ))
        ) : (
          <p>No blogs available</p>
        )}
      </div>
      <footer>
        <button onClick={createBlog}>Create Blog</button>
      </footer>
    </>
  );
}
