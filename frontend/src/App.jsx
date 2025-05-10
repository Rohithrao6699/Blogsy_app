import "./App.css";
import { Signup } from "./components/signup";
import { Blogs } from "./components/blogs";
import { BlogCreation } from "./components/createBlog";
import { MyBlogs } from "./components/myblogs";
import { Login } from "./components/login";
import { AuthorBlogs } from "./components/authorBlogs";
import { Home } from "./components/home";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { NavBar } from "./components/navBar";
import { Footer } from "./components/footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/error" element={<Error />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="author-blogs" element={<AuthorBlogs />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="blogs" element={<Blogs />} />
              <Route path="createblog" element={<BlogCreation />} />
              <Route path="myblogs" element={<MyBlogs />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

function Layout() {
  return (
    <div className="min-h-screen w-screen flex flex-col">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

function ProtectedRoute() {
  const auth = localStorage.getItem("token");
  const isAuthenticated = auth && auth !== "null" && auth !== "undefined";
  return isAuthenticated ? <Outlet /> : <Navigate to="/error" />;
}

export default App;
