import { useHistory } from "react-router";
import Login from "./login";

const Logout = () => {
  const history = useHistory();
  localStorage.removeItem("token");
localStorage.removeItem("user");
  window.location.href = "http://localhost:3000/parent";
  return (
    <>
      <Login />
    </>
  );
};
export default Logout;
