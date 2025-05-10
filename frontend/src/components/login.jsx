import { useNavigate } from "react-router-dom";
import { signin } from "../api/fetch";
import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

export function Login() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ email: "", password: "" });
  const debouncefn = useDebounce(handleChange);

  function handleChange(e) {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(userData);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const data = await signin(userData);
    if (data.success) {
      localStorage.setItem("token", data.token);
      navigate("/blogs");
    } else {
      console.log(data.message);
    }
  }
  return (
    <>
      SignUp successfull! Please Login with email and password
      <form onSubmit={handleSubmit}>
        <input type="text" name="email" onChange={(e) => debouncefn(e)} />
        <input type="text" name="password" onChange={(e) => debouncefn(e)} />
        <button type="submit">Login</button>
      </form>
    </>
  );
}
