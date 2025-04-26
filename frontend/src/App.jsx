import "./App.css";
import { useEffect, useState } from "react";
import { fetchAllBlogs } from "./assets/api/fetch";
import { Home } from "./assets/components/home";
import { Signup } from "./assets/components/signup";
import { Blogs } from "./assets/components/blogs";
import { BlogCreation } from "./assets/components/createBlog";
import { MyBlogs } from "./assets/components/myblogs";
import { Login } from "./assets/components/login";
import { AuthorBlogs } from "./assets/components/authorBlogs";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;

  async function getBlogs(page) {
    const data = await fetchAllBlogs(page, limit);
    console.log(data.blogs);
    setBlogs(data.blogs);
    setTotalPages(data.totalPages);
    console.log(data.blogs[0].userId.name);
  }
  useEffect(() => {
    getBlogs(currentPage);
  }, [currentPage]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/error" element={<Error />} />
          <Route
            path="/"
            element={
              <Home
                blogs={blogs}
                setBlogs={setBlogs}
                getBlogs={getBlogs}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            }
          />
          <Route path="author-blogs" element={<AuthorBlogs />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route
              path="/blogs"
              element={
                <Blogs blogs={blogs} setBlogs={setBlogs} getBlogs={getBlogs} />
              }
            />
            <Route path="/createblog" element={<BlogCreation />} />
            <Route path="/myblogs" element={<MyBlogs />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

function ProtectedRoute() {
  const auth = localStorage.getItem("token");
  const isAuthenticated = auth && auth !== "null" && auth !== "undefined";
  return isAuthenticated ? <Outlet /> : <Navigate to="/error" />;
}

export default App;
