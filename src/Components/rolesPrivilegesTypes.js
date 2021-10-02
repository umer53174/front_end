import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
} from "@material-ui/core";

import { useEffect, useState } from "react";
import { useParams } from "react-router";

const paperStyle = {
  padding: 20,
  height: "auto",
  width: 500,
  margin: "20px auto",
};
const formstyle = {
  display: "flex",
  justifyContent: "flex-end",
};
const RolePrivilegesTpes = () => {
  const { id } = useParams();
  const [privilegesTypes, setPrivilegesTypes] = useState();
  console.log("User Id is ==========", id);
  console.log("State data is", privilegesTypes);

  const GetPrivelegesTypes = async () => {
    const res = await fetch("/getrolesprivilegestypes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
    const data = await res.json();
    if (data.status == 422 || !data) {
      console.log("Invalid ");
    } else {
      console.log("Registration Successful", data);

      let dataObject = data.defaultprev;
      setPrivilegesTypes(data.defaultprev);
      // console.log("data  is ====", data.defaultprev);
    }
  };
  const HandleInput = (object, keys, values) => {
    console.log("Object is", object);
    console.log("Keys are", keys);
    console.log("values are", values);
    let newValue = values === "true" ? true : false;
    let d2;
    Object.keys(privilegesTypes).map((item) => {
      console.log("Item = ", privilegesTypes[item]);
      if (item === object) {
        Object.keys(privilegesTypes[item]).map((item2) => {
          if (item2 === keys) {
            privilegesTypes[item][item2] = newValue;
            console.log("Item 2 = ", item2);
            console.log("Item value = ", {
              ...privilegesTypes,
              [item]: {
                ...privilegesTypes[item],
                [item2]: privilegesTypes[item][item2],
              },
            });
            d2 = {
              ...privilegesTypes,
              [item]: {
                ...privilegesTypes[item],
                [item2]: privilegesTypes[item][item2],
              },
            };
          }
        });
      }
    });

    setPrivilegesTypes(d2);
  };
  const SubmitPrivilegeTypes = async () => {
    const res = await fetch("/updateroleprivilegestypes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        defaultprev: privilegesTypes,
      }),
    });
    const data = await res.json();
    if (data.status == 422 || !data) {
      console.log("Invalid ");
    } else {
      console.log("Updated  Successfully.....!");
      window.alert("Updated  Successfully.....!");
      window.location.href = "http://localhost:3000/";
    }
  };

  useEffect(() => {
    GetPrivelegesTypes();
  }, []);

  return (
    <>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <center>
            <h1>PrivilegesTpes</h1>
          </center>
          {console.log("Privilege Type is =", privilegesTypes)}

          {privilegesTypes &&
            Object.keys(privilegesTypes).length > 0 &&
            Object.keys(privilegesTypes).map((key, index) => (
              <>
                <h4
                  style={{
                    backgroundColor: "#3F51B5",
                    color: "white",
                    padding: 5,
                  }}
                >
                  {" "}
                  {key}
                </h4>

                {privilegesTypes &&
                  Object.keys(privilegesTypes).length > 0 &&
                  Object.keys(privilegesTypes[key]).map((key2, index2) => (
                    <>
                      <h5>{key2}</h5>

                      {console.log("Values are===", privilegesTypes[key][key2])}
                      <FormControl
                        component="fieldset"
                        style={{ justifyContent: "flex-end", display: "flex" }}
                      >
                        <FormLabel component="legend">Permissions</FormLabel>
                        <RadioGroup
                          aria-label="gender"
                          defaultValue="female"
                          name="radio-buttons-group"
                          onChange={(e) => {
                            HandleInput(key, key2, e.target.value);
                          }}
                          value={privilegesTypes[key][key2]}
                          row
                        >
                          <FormControlLabel
                            value={true}
                            control={<Radio />}
                            label="Yes"
                          />
                          <FormControlLabel
                            value={false}
                            control={<Radio />}
                            label="No"
                          />
                        </RadioGroup>
                      </FormControl>
                    </>
                  ))}
              </>
            ))}
          <Button
            fullWidth
            color="primary"
            variant="contained"
            onClick={SubmitPrivilegeTypes}
          >
            Submit
          </Button>
        </Paper>
      </Grid>
    </>
  );
};

export default RolePrivilegesTpes;
