import { useEffect, useState } from "react";
import React from "react";
import TextField from "@material-ui/core/TextField";
import "../Styles/index.css";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import TablePagination from "@material-ui/core/TablePagination";
import { Container, Grid } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import AddPrivilges from "./addPrivileges";

/// table Width////

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    marginTop: theme.spacing(7),
    width: "100%",
    overflowX: "auto",
    marginBottom: theme.spacing(3),
    margin: "auto",
  },
  table: {
    width: "100%",
    borderSpacing: "0 px !important",
    borderCollapse: "separate !important",
  },
  colordiv: {
    backgroundColor: "#3F51B5",
  },
}));

const Privilages = ({ privileges }) => {
  const classes = useStyles();
  console.log("Privilage of Privilege Page======", privileges);
  /// Update Model States///
  const [open, setOpen] = React.useState(false);
  const [openRole, setOpenRole] = React.useState(false);

  const [modelUser, setModelUser] = useState({
    title: "",
    keys: "",
  });

  //////// Table States///
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [userCounts, setCounts] = useState();

  //////GET ROLES STATE ///
  const [Priveleges, setPriveleges] = useState([]);

  ///Update Model States Functions//

  const handleClickOpen = (row) => {
    setModelUser(row);
    setOpen(true);
  };
  ///// Updating Privileges///

  const [managePrivileges, setManagePrivileges] = useState(false);
  useEffect(() => {
    if (privileges) {
      console.log("===> ", privileges["MANAGE_PRIVILEGES"]);
      setManagePrivileges(privileges["MANAGE_PRIVILEGES"]);
    }
  }, [privileges]);

  let keys = modelUser.keys;
  keys = keys.replace(/\s+/g, "_").toUpperCase();

  const handleClose = async () => {
    setOpen(false);
    const { _id, title } = modelUser;
    console.log(modelUser);
    const res = await fetch("/updateprivileges", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
        title,
        keys,
      }),
    });
    const data = await res.json();
    if (data.status == 422 || !data) {
      window.alert("invalid Registration");
      console.log("Invalid Registration");
    } else {
      window.alert("Data Updated ");
      console.log("Registration Successful");
      GetPriveleges(page, rowsPerPage);
    }
  };

  ////
  const handleCloseRoles = () => {
    setOpenRole(false);
  };

  const handleOpenRole = () => {
    console.log(openRole);
    setOpenRole(true);
  };

  //////// Table Function///
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    GetPriveleges(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    GetPriveleges(page, event.target.value);
    setPage(0);
  };

  /// {BACK END FUNCTION}///
  //// GETTING Data from BacKend///
  const GetPriveleges = async (numberofResult, Numberofpage) => {
    const res = await fetch("/getprivileges", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page: numberofResult,
        rowsPerPage: Numberofpage,
      }),
    });
    console.log(page);
    console.log(rowsPerPage);
    const data = await res.json();
    if (data.status == 422 || !data) {
      console.log("Invalid ");
    } else {
      console.log("Registration Successful", data);
      setPriveleges(data.user);
      setCounts(data.counts);
    }
  };

  //// DELETING Data from BacKend///
  const HandleDeleteEvent = async (id) => {
    console.log("id is", id);
    const res = await fetch("/deletepriveleges", {
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
      console.log("Invalid Registration");
    } else {
      GetPriveleges(page, rowsPerPage);
      console.log("Login Successful", data);
    }
  };

  useEffect(() => {
    GetPriveleges(page, rowsPerPage);
  }, []);
  const gridstyle = { backgroundColor: "#F8F9FA" };

  return (
    <>
      <Grid>
        <Container>
          <h1 style={{ margin: "30px auto" }}>ManagePrivileges</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
              padding: "0",
            }}
          >
            {" "}
            {managePrivileges.CAN_ADD && (
              <Button
                startIcon={<AddIcon />}
                style={{ color: "blue" }}
                onClick={handleOpenRole}
              >
                Add Privilages
              </Button>
            )}
          </div>
          <Paper className={classes.paper}>
            <Table
              className={classes.table}
              aria-label="simple table"
              size="small"
            >
              <TableHead className={classes.colordiv}>
                <TableRow>
                  <TableCell
                    align="center"
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      width: "20vw",
                    }}
                  >
                    Section Title
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      width: "20vw",
                    }}
                  >
                    Title
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      width: "20vw",
                    }}
                  >
                    keystion
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      width: "20vw",
                    }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Priveleges.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell align="center">
                      {row &&
                        Object.keys(row.sections).length > 0 &&
                        row.sections[0].title}
                    </TableCell>
                    <TableCell align="center">{row.title}</TableCell>
                    <TableCell align="center">{row.keys}</TableCell>

                    <TableCell align="center">
                      {managePrivileges.CAN_EDIT && (
                        <IconButton
                          variant="contained"
                          color="primary"
                          fontSize="small"
                          onClick={() => handleClickOpen(row)}
                        >
                          <EditIcon />
                        </IconButton>
                      )}
                      {managePrivileges.CAN_DELETE && (
                        <IconButton
                          variant="contained"
                          color="primary"
                          fontSize="small"
                          onClick={() => HandleDeleteEvent(row._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

              <TablePagination
                component="div"
                count={userCounts}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Table>
          </Paper>
        </Container>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <DialogContentText>Update Record..</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            name="title"
            onChange={(e) =>
              setModelUser({
                ...modelUser,
                title: e.target.value,
                keys: e.target.value,
              })
            }
            value={modelUser.title}
            label="Title"
            fullWidth
          />
          <TextField
            autoFocus
            name="keys"
            margin="dense"
            id="keys"
            value={keys}
            label="keystion"
            fullWidth
          />
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            startIcon={<DeleteIcon />}
          >
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Modify
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openRole}
        onClose={handleCloseRoles}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <AddPrivilges openRole={openRole} setOpenRole={setOpenRole} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Privilages;
