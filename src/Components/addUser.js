
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useEffect, useState } from "react";
import { Grid, Paper, Avatar, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { useHistory } from "react-router";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";


const paperStyle = {
  padding: 20,
  height: "120vh",
  width: 300,
  margin: "20px auto",
};
const AvaterStyle = { backgroundColor: "green" };
const ButtonStyle = { margin: "50px auto" };
const AddUser = (props) => {
  const history = useHistory();
  const [addUser, setAddUser] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });
  const[getRoles,SetGetRoles]=useState();
  const [role_id, setroles_ids] =useState();
  const handleChange = (event) => {
      console.log("event",event);
      setroles_ids(event);
  };

  const SubmitAddUser = async () => {
    const { fname,lname,email,password} = addUser;
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fname,
        lname,
        email,
        password,
        role_id
        
      }),
    });

    const data = await res.json();
    if (data.status === 422 || !data) {
      console.log("Invalid ");
    } else {
      console.log("Registration Successful", data);
      window.alert("Section  Add SucessFully...!");
       props.setOpenRole(false)
       window.location.href="http://localhost:3000/profile"
    }
  };
  const GetRoles = async () => {
    const res = await fetch("/getroles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.status === 422 || !data) {
      console.log("Invalid ");
    } else {
      console.log("Get Roles  Successfully.....!", data);
      SetGetRoles(data.user);
    }
  };

  useEffect(() => {
    GetRoles();
  }, []);

  return (
    <>
      <Grid>
        <Paper style={paperStyle}>
          <Grid align="center">
            <Avatar style={AvaterStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h3>Manage User</h3>
          </Grid>
          <TextField
            label="FirstName"
            id="fname"
            name="fname"
            value={addUser.fname}
            fullWidth
            onChange={(e) => {
              setAddUser({ ...addUser, fname: e.target.value});
            }}
            required
          />
          <TextField
            label="LastName"
            id="lname"
            name="lname"
            value={addUser.lname}
            fullWidth
            onChange={(e) => {
              setAddUser({ ...addUser, lname: e.target.value});
            }}
            required
          />
            
            <TextField
            label="Email"
            id="email"
            name="email"
            value={addUser.email}
            fullWidth
            onChange={(e) => {
              setAddUser({ ...addUser, email: e.target.value});
            }}
            required
          />
          <TextField
            label="Password"
            id="password"
            name="password"
            value={addUser.password}
            fullWidth
            onChange={(e) => {
              setAddUser({ ...addUser, password: e.target.value});
            }}
            required
          />
         <FormControl fullWidth>
        <InputLabel id="demo-multiple-name-label">Name</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={role_id}
          onChange={(e)=>handleChange(e.target.value)}    >
          {getRoles?.map((roles) => (
            <MenuItem  key={roles._id} value={roles._id}>
              {roles.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl> 
      <Button
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            style={ButtonStyle}
            onClick={SubmitAddUser }
          >
            AddUser
          </Button>
        </Paper>
      </Grid>
    </>
  );
};

export default AddUser;
