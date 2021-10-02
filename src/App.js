import Parent from "./Components/Parent";
import Register from "./Components/Register";
import Logout from "./Components/logout";
import Roles from "./Components/roles";
import AddRoles from "./Components/userroles";
import AddSection from "./Components/addSection";
import Section from "./Components/Section";
import AddUser from "./Components/addUser";
import Privilages from "./Components/privilege";
import AddPrivilges from "./Components/addPrivileges";
import RolesPrivilege from "./Components/rolesPrivilegesTypes";
import Profile from "./Components/profile";
import { Route } from "react-router";
import HomePage from "./Components/Homepage";
import PrivilegesTpes from "./Components/privilegesTypes";
import Navbar from "./Components/navbar";

const App = () => {
  let getToken = localStorage.getItem("token");
  let data = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Navbar privileges={data?.defaultprev} />
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route exact path="/parent">
        <Parent />
      </Route>
      <Route exact path="/register">
        <Register />
      </Route>
      <Route exact path="/logout">
        <Logout />
      </Route>
      <Route exact path="/roles">
        <Roles privileges={data?.defaultprev} />
      </Route>
      <Route exact path="/userroles">
        <AddRoles />
      </Route>
      <Route exact path="/addSection">
        <AddSection />
      </Route>
      <Route exact path="/Section">
        <Section privileges={data?.defaultprev} />
      </Route>
      <Route exact path="/addUser">
        <AddUser />
      </Route>
      <Route exact path="/privilege">
        <Privilages  privileges={data?.defaultprev} />
      </Route>
      <Route exact path="/addPrivileges">
        <AddPrivilges />
      </Route>
      <Route exact path="/privilegesTypes/:id">
        <PrivilegesTpes />
      </Route>
      <Route exact path="/rolesPrivilegesTypes/:id">
        <RolesPrivilege />
      </Route>
      {getToken ? (
        <Route exact path="/profile">
          <Profile  privileges={data?.defaultprev} />
        </Route>
      ) : (
        ""
      )}
    </>
  );
};

export default App;
