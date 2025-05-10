import { useState } from "react";
import { signup } from "../api/fetch";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";

export function Signup() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const debouncefn = useDebounce(handleChange);

  function handleChange(e) {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    //on every key press this is called, so we need to debounce it!
    console.log(userData);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const data = await signup(userData);
    if (data.success) {
      navigate("/login");
    } else {
      console.log(data.message);
    }
  }

  return (
    <>
      Not SignedUp with us? enter details here
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" onChange={(e) => debouncefn(e)} />

        <input type="text" name="email" onChange={(e) => debouncefn(e)} />
        <input type="text" name="password" onChange={(e) => debouncefn(e)} />
        <button type="submit">SignUp</button>
      </form>
      Already SignedUp with us? click here to Login
      <button onClick={() => navigate("/login")}>login</button>
    </>
  );
}
