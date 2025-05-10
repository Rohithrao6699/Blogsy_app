import { useNavigate } from "react-router-dom";
import { Paginate } from "./paginate";
import { usePaginationStore } from "../storeZustand/PaginationStore";
import { useEffect } from "react";
import { useBlogStore } from "../storeZustand/AllBlogs";
import { fetchAllBlogs } from "../api/fetch";
import { BlogBlock } from "../ui/blogBlock";

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

  function handleGetAuthor(userId) {
    navigate(`/author-blogs?userId=${userId}`);
  }
  function redirect() {
    navigate("/signup");
  }
  return (
    <div className="flex-1 min-h-[70vh]">
      <p>Home</p>
      {blogs.map((blog) => (
        <BlogBlock
          id={blog._id}
          title={blog.title}
          content={blog.content}
          author={blog.userId.name}
          handleGetAuthor={handleGetAuthor}
        />
      ))}
      <Paginate />
      <button onClick={redirect}>create Blogs</button>
    </div>
  );
}
