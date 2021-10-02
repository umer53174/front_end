
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { Grid, Paper, Avatar } from "@material-ui/core";
import { useHistory } from "react-router";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { DescriptionTwoTone } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
const paperStyle = {
  padding: 20,
  height: "70vh",
  width: 300,
  margin: "20px auto",
};
const AvaterStyle = { backgroundColor: "green" };
const ButtonStyle = { margin: "50px auto" };
const AddRoles = (props) => {



  const history = useHistory();
  const [addRoles,setAddRoles]=useState(
    {
        title:"",
        descrip:"",
        defaultpreiv:""
    }
    )
    const SubmitRoles=async()=>{
        const {title,descrip,defaultpreiv}=addRoles;
        const res = await fetch("/addrole", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title,
              descrip,
              defaultpreiv:""
                
            }),
          });
         
          const data = await res.json();
          if (data.status == 422 || !data) {
            console.log("Invalid ");
          } else {
         console.log("Registration Successful", data);
          window.alert("Role Add SucessFully...!")
          window.location.href="http://localhost:3000/roles"
          props.setOpenRole(false);
          }
    
    
    }
    
  return (
    <>
      <Grid>
        <Paper  style={paperStyle}>
          <Grid align="center">
            <Avatar style={AvaterStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h3>Manage Role</h3>
          </Grid>
          <TextField
            label="Title"
            id="title"
            name="title"
            fullWidth
            onChange={(e)=>{setAddRoles({...addRoles,title:e.target.value})}}
            required
          />
          <TextField
            label="Descrip"
            id="descrip"
            name="descrip"
            onChange={(e)=>{setAddRoles({...addRoles,descrip:e.target.value})}}
            fullWidth
            required
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            style={ButtonStyle}
            onClick={SubmitRoles}
           >
            Submit
          </Button>
        </Paper>
      </Grid>


    </>
  );
};

export default AddRoles;
