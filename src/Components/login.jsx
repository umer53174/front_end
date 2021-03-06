import Parent from "./Parent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { Grid, Paper, Avatar } from "@material-ui/core";
import { useHistory } from "react-router";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { DescriptionTwoTone } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
// const useStyles = makeStyles({
//   field: {
//     marginTop: 20,
//     marginBottom: 20,
//     display: "block",
//   },
// });

const paperStyle = {
  padding: 20,
  height: "70vh",
  width: 300,
  margin: "20px auto",
};
const AvaterStyle = { backgroundColor: "green" };
const ButtonStyle = { margin: "50px auto"};

const Login = (props) => {
  const history = useHistory();

  return (
    <>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={AvaterStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h3>Login</h3>
          </Grid>
          <TextField
            label="Email"
            id="email"
            name="email"
            onChange={(e) => {
              props.SetLoginUser({
                ...props.LoginUser,
                email: e.target.value,
              });
            }}
            value={
              props && props.LoginUser && props.LoginUser.email
                ? props.LoginUser.email
                : ""
            }
            fullWidth
            required
          />
          <TextField
            label="Password"
            id="password"
            name="password"
            onChange={(e) => {
              props.SetLoginUser({
                ...props.LoginUser,
                password: e.target.value,
              });
            }}
            value={
              props && props.LoginUser && props.LoginUser.password
                ? props.LoginUser.password
                : ""
            }
            fullWidth
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={ButtonStyle}
            onClick={props.PostDta}
          >
            Login
          </Button>
        </Paper>
      </Grid>


    </>
  );
};

export default Login;
