import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useEffect, useState } from "react";
import { Grid, Paper, Avatar, MenuItem, InputLabel, FormControl, Select } from "@material-ui/core";
import { useHistory } from "react-router";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";



const paperStyle = {
  padding: 20,
  height: "70vh",
  width: 300,
  margin: "20px auto",
};
const AvaterStyle = { backgroundColor: "green" };
const ButtonStyle = { margin: "50px auto" };
const AddPrivilges = (props) => {

  const history = useHistory();
  const [addPrivilges, setaddPrivilges] = useState({
    title: "",
    keys: "",
  });
  const[Section,setSection]=useState();
  const[section_ids,Setsection_ids]=useState();


    let keys=addPrivilges.keys;
    keys= keys.replace(/\s+/g, '_').toUpperCase();


    const handleChange = (event) => {
        console.log("event",event);
        Setsection_ids(event);
    };


  const SubmitPriveleges = async () => {
    const { title} = addPrivilges;
    const res = await fetch("/addpriveleges", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        keys,
        section_ids,
        
      }),
    });

    const data = await res.json();
    if (data.status === 422 || !data) {
      console.log("Invalid ");
    } else {
      console.log("Registration Successful", data);
      window.alert("Section  Add SucessFully...!");
      props.setOpenRole(false)
      window.location.href="http://localhost:3000/privilege"
    }
  };
  const GetSection = async () => {
    const res = await fetch("/getsection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      
    });
    const data = await res.json();
    if (data.status === 422 || !data) {
      console.log("Invalid ");
    } else {
      console.log("Registration Successful", data);
      setSection(data.section);
 
    }
  };

  useEffect(() => {
    GetSection();
  }, []);
  return (
    <>
      <Grid>
        <Paper style={paperStyle}>
          <Grid align="center">
            <Avatar style={AvaterStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h3>Manage Privilages</h3>
          </Grid>
          <TextField
            label="Title"
            id="title"
            name="title"
            value={addPrivilges.title}
            fullWidth
            onChange={(e) => {
              setaddPrivilges({ ...addPrivilges, title: e.target.value ,keys:e.target.value});
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
 
        <FormControl fullWidth>
        <InputLabel id="demo-multiple-name-label">Section</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={section_ids}
          onChange={(e)=>handleChange(e.target.value)}    >
          {Section?.map((section) => (
            <MenuItem  key={section._id} value={section._id}>
              {section.title}
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
            onClick={SubmitPriveleges}
          >
            Submit
          </Button>
        </Paper>
      </Grid>
    </>
  );
};

export default AddPrivilges;
