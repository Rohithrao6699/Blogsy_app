import { useNavigate } from "react-router-dom";

export function Blogs() {
  const navigate = useNavigate();
  const { blogs, setBlogs } = useBlogStore();
  const { currentPage, limit, setTotalPages } = usePaginationStore();

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

  async function getBlogs(page) {
    const data = await fetchAllBlogs(page, limit);
    console.log(data);
    console.log(data.content.blogs);
    setBlogs(data.content.blogs);
    setTotalPages(data.content.totalPages);
  }

  useEffect(() => {
    console.log(currentPage);
    getBlogs(currentPage);
  }, [currentPage]);

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
        <Paginate />
      </div>
      <footer>
        <button onClick={createBlog}>Create Blog</button>
      </footer>
    </>
  );
}
