import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = ({ privileges }) => {
  let getToken = localStorage.getItem("token");
  const [manageUser, setManageUser] = useState(false);
  const[manageRoles,setManageRoles]=useState(false);
  const[manageSection,setManageSection]=useState(false);
  const[managePrivileges,setManagePrivileges]=useState(false);
  
  console.log("Privileges are",manageUser);

  useEffect(() => {
    if (privileges) {
      setManageUser(privileges["MANAGE_USER"]?.CAN_VIEW);
      setManageRoles(privileges["MANAGE_ROLES"]?.CAN_VIEW);
      setManageSection(privileges["MANAGE_SECTION"]?.CAN_VIEW);
      setManagePrivileges(privileges["MANAGE_PRIVILEGES"]?.CAN_VIEW)
    }
  }, [privileges]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            DoneSol
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/parent">
                  Login
                </NavLink>
              </li>

              {getToken && manageUser ? (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/profile">
                    Manage User
                  </NavLink>
                </li>
              ) : (
                ""
              )}
              {getToken && manageRoles  ? (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/roles">
                    Manage Roles
                  </NavLink>
                </li>
              ) : (
                ""
              )}

              {getToken && manageSection? (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/Section">
                    Manage Sections
                  </NavLink>
                </li>
              ) : (
                ""
              )}
              {getToken  && managePrivileges ? (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/privilege">
                    Manage Privileges
                  </NavLink>
                </li>
              ) : (
                ""
              )}

              {getToken ? (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/logout">
                    Logout
                  </NavLink>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
