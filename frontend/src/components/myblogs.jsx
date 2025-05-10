import { useNavigate } from "react-router-dom";
import { myblogs, updateblog, deleteblog } from "../api/fetch";
import { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useUserBlogs } from "../storeZustand/UserBlogs";

export function MyBlogs() {
  const navigate = useNavigate();
  const { myBlogs, editState, setMyBlogs, setEditState } = useUserBlogs();
  const [editedData, setEditedData] = useState({
    title: "",
    content: "",
    typeOf: "",
  });

  async function getBlogs() {
    const data = await myblogs();
    console.log(data.blogs);
    setMyBlogs(data.blogs);
  }
  function redirect() {
    navigate("/createblog");
  }

  useEffect(() => {
    getBlogs();
  }, []);

  const debouncefn = useDebounce(handleChange);

  function handleChange(e) {
    setEditedData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const data = await updateblog({ ...editedData, blogId: editState });
    if (data.success) {
      setEditState(null);
      setMyBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === editState ? { ...blog, ...editedData } : blog
        )
      );
    }
  }

  function handleEdit(blog) {
    setEditState(blog._id);
    setEditedData({
      title: blog.title,
      content: blog.content,
      typeOf: blog.typeOf,
    });
  }
  async function handleDelete(blogId) {
    const data = await deleteblog(blogId);
    if (data.success) {
      getBlogs();
    }
  }
  function handleLogOut() {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  }

  return (
    <>
      <button onClick={handleLogOut}>Logout</button>
      <button onClick={() => navigate("/blogs")}>home</button>
      {myBlogs.length > 0 ? (
        <>
          {myBlogs.map((blog) => (
            <ul key={blog._id}>
              {editState === blog._id ? (
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="title"
                    value={editedData.title}
                    onChange={(e) => debouncefn(e)}
                  />
                  <input
                    type="text"
                    name="content"
                    value={editedData.content}
                    onChange={(e) => debouncefn(e)}
                  />
                  <input
                    type="text"
                    name="typeOf"
                    value={editedData.typeOf}
                    onChange={(e) => debouncefn(e)}
                  />
                  <button type="submit">save</button>
                  <button onClick={() => setEditState(null)}>cancel</button>
                </form>
              ) : (
                <>
                  <li>{blog.title}</li>
                  <li>{blog.content}</li>
                  <p>Category: {blog.typeOf}</p>
                  <button onClick={() => handleEdit(blog)}>edit Blog</button>
                  <button onClick={() => handleDelete(blog._id)}>
                    delete Blog
                  </button>
                </>
              )}
            </ul>
          ))}
          <button onClick={redirect}>CreateBlog</button>
        </>
      ) : (
        <>
          <p>No blogs created!</p>
          <button onClick={redirect}>CreateBlog</button>
        </>
      )}
    </>
  );
}
