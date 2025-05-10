import { useNavigate } from "react-router-dom";
import { Paginate } from "./paginate";
import { usePaginationStore } from "../storeZustand/PaginationStore";
import { useEffect } from "react";
import { useBlogStore } from "../storeZustand/AllBlogs";
import { fetchAllBlogs } from "../api/fetch";

export function Home() {
  const navigate = useNavigate();
  const { blogs, setBlogs } = useBlogStore();
  const { currentPage, limit, setTotalPages } = usePaginationStore();

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

  function redirect() {
    navigate("/signup");
  }

  function handleGetAuthor(userId) {
    navigate(`/author-blogs?userId=${userId}`);
  }

  return (
    <>
      <button onClick={redirect}>Login</button>
      Home
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
      <Paginate />
      <button onClick={redirect}>create Blogs</button>
    </>
  );
}
