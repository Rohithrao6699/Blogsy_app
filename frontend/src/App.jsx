import "./App.css";
import { useEffect, useState } from "react";
import { Signup } from "./components/signup";
import { Blogs } from "./components/blogs";
import { BlogCreation } from "./components/createBlog";
import { MyBlogs } from "./components/myblogs";
import { Login } from "./components/login";
import { AuthorBlogs } from "./components/authorBlogs";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { fetchAllBlogs } from "./api/fetch";
import { Home } from "./components/home";
import { useBlogStore } from "./storeZustand/AllBlogs";

function App() {
  const [blogs, setBlogs] = useState([]);
  const limit = 5;

  async function getBlogs(page) {
    const data = await fetchAllBlogs(page, limit);
    console.log(data);
    console.log(data.content.blogs);
    setBlogs(data.content.blogs);
    setTotalPages(data.content.totalPages);
  }
  // useEffect(() => {
  //   getBlogs(currentPage);
  // }, [currentPage]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/error" element={<Error />} />
          <Route path="/" element={<Home />} />
          <Route path="author-blogs" element={<AuthorBlogs />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/blogs" element={<Blogs />} />
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
