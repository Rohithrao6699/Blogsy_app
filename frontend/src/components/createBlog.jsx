import { useNavigate } from "react-router-dom";
import { createblog } from "../api/fetch";
import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

export function BlogCreation() {
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    typeOf: "",
  });

  const debouncefn = useDebounce(handleChange);

  function handleChange(e) {
    setBlogData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(blogData);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const data = await createblog(blogData);
    if (data.success) {
      navigate("/myblogs");
    } else {
      console.log("something went wrong!");
    }
  }
  return (
    <>
      Enter Blog Details
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" onChange={(e) => debouncefn(e)} />
        <input type="text" name="content" onChange={(e) => debouncefn(e)} />
        <input type="text" name="typeOf" onChange={(e) => debouncefn(e)} />
        <button type="submit">Save Blog</button>
      </form>
    </>
  );
}
