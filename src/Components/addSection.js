
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


const AddSection = (props) => {
  const history = useHistory();
  const [addSection, setaddSection] = useState({
    title: "",
    keys: "",
  });
  
    let keys=addSection.keys;
    keys= keys.replace(/\s+/g, '_').toUpperCase();


  const SubmitSection = async () => {
    const { title} = addSection;
    const res = await fetch("/addsection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        keys,
        
      }),
    });

    const data = await res.json();
    if (data.status == 422 || !data) {
      console.log("Invalid ");
    } else {
      console.log("Registration Successful", data);
      window.alert("Section  Add SucessFully...!");
      props.setOpenRole(false);
      window.location.href="http://localhost:3000/Section"
    }
  };

  return (
    <>
      <Grid>
        <Paper style={paperStyle}>
          <Grid align="center">
            <Avatar style={AvaterStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h3>Manage Section</h3>
          </Grid>
          <TextField
            label="Title"
            id="title"
            name="title"
            value={addSection.title}
            fullWidth
            onChange={(e) => {
              setaddSection({ ...addSection, title: e.target.value ,keys:e.target.value});
            }}
            required
          />
          <TextField
            label="Key"
            id="keys"
            name="keys"
            value={keys}
            fullWidth
            required
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            style={ButtonStyle}
            onClick={SubmitSection}
          >
            AddRoles
          </Button>
        </Paper>
      </Grid>
    </>
  );
};

export default AddSection;
