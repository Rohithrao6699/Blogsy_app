import { useNavigate } from "react-router-dom";

export function NavBar() {
  const navigate = useNavigate();
  function redirect() {
    navigate("login");
  }
  function redirectSignUp() {
    navigate("signup");
  }
  return (
    <div className="h-[15vh] bg-red-100">
      <p>navbar</p>
      <div>
        <button onClick={redirect}>Login</button>
        <button onClick={redirectSignUp}>SignUp</button>
      </div>
    </div>
  );
}
