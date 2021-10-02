import { useEffect, useState } from "react";
import React from "react";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router";
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
import { Container } from "@material-ui/core";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import AddUser from "./addUser";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    marginTop: theme.spacing(7),
    width: "100%",
    overflowX: "auto",
    marginBottom: theme.spacing(2),
    margin: "auto",
  },
  table: {
    width: "100%",
  },
  colordiv: {
    backgroundColor: "#3F51B5",

    buttoncolor: {
      backgroundColor: "#3F51B5",
    },
  },
}));
const Profile = ({ privileges }) => {
  let getToken = localStorage.getItem("token");
  const [manageUser, setManageUser] = useState(false);
  const [manageRoles, setManageRoles] = useState(false);

  const [managePrivileges, setManagePrivileges] = useState(false);
  useEffect(() => {
    if (privileges) {
      console.log("===> ", privileges["MANAGE_USER"]);
      setManageUser(privileges["MANAGE_USER"]);
    }
  }, [privileges]);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openRole, setOpenRole] = React.useState(false);
  const history = useHistory();
  //// Model Use State///
  const [modelUser, setModelUser] = useState({
    fname: "",
    lname: "",
    email: "",
  });

  const handleClickOpen = (row) => {
    setModelUser(row);
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
    const { _id, fname, lname, email } = modelUser;
    const res = await fetch("/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
        fname,
        lname,
        email,
      }),
    });
    const data = await res.json();
    if (data.status == 422 || !data) {
      window.alert("invalid Registration");
    } else {
      window.alert("Data Updated ");
      callProfilePage(page, rowsPerPage);
    }
  };
  /// Updating use state///

  const handleCloseRoles = () => {
    setOpenRole(false);
  };

  const handleOpenRole = () => {
    setOpenRole(true);
  };

  const [profileUser, setProfileUser] = useState([]);

  //////// Table States
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [userCounts, setCounts] = useState();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    callProfilePage(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    callProfilePage(page, event.target.value);
    setPage(0);
  };

  //// GETTING Data from BacKend///
  const callProfilePage = async (numberofResult, Numberofpage) => {
    const res = await fetch("/getuserinfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page: numberofResult,
        rowsPerPage: Numberofpage,
      }),
    });

    const data = await res.json();
    if (data.status == 422 || !data) {
      console.log("Invalid ");
    } else {
      setProfileUser(data.user);
      setCounts(data.counts);
    }
  };

  //// DELETE FUNCTION////
  const HandleDeleteEvent = async (id) => {
    const res = await fetch("/delete", {
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
      callProfilePage(page, rowsPerPage);
    }
  };
  const HandleGetEventId = (id) => {
    history.push(`./privilegesTypes/${id}`);
  };
  useEffect(() => {
    callProfilePage(page, rowsPerPage);
  }, []);

  // callProfilePage();
  return (
    <>
      <Container>
        <h1 style={{ margin: "30px auto" }}>Manage User</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            padding: "0",
          }}
        >
          {manageUser.CAN_ADD && (
            <Button
              startIcon={<AddIcon />}
              style={{ color: "blue" }}
              onClick={handleOpenRole}
            >
              Add User
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
                  style={{ color: "white", fontWeight: "bold", width: "20vw" }}
                >
                  FirstName
                </TableCell>
                <TableCell
                  align="center"
                  style={{ color: "white", fontWeight: "bold", width: "20vw" }}
                >
                  LastName
                </TableCell>
                <TableCell
                  align="center"
                  style={{ color: "white", fontWeight: "bold", width: "20vw" }}
                >
                  Email
                </TableCell>
                <TableCell
                  align="center"
                  style={{ color: "white", fontWeight: "bold", width: "20vw" }}
                >
                  UserRoles
                </TableCell>
                <TableCell
                  align="center"
                  style={{ color: "white", fontWeight: "bold", width: "20vw" }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {profileUser?.map((row) => (
                <TableRow key={row._id}>
                  <TableCell align="center" style={{ width: "20vw" }}>
                    {row.fname}
                  </TableCell>
                  <TableCell align="center" style={{ width: "20vw" }}>
                    {row.lname}
                  </TableCell>
                  <TableCell align="center" style={{ width: "20vw" }}>
                    {row.email}
                  </TableCell>
                  <TableCell align="center" style={{ width: "20vw" }}>
                    {row.userroles && Object.keys(row.userroles).length > 0
                      ? row.userroles[0].title
                      : ""}
                  </TableCell>
                  <TableCell align="center">
                    {manageUser.CAN_EDIT && (
                      <IconButton
                        variant="contained"
                        color="primary"
                        fontSize="small"
                        onClick={() => handleClickOpen(row)}
                      >
                        <EditIcon />
                      </IconButton>
                    )}
                    {manageUser.CAN_DELETE && (
                      <IconButton
                        variant="contained"
                        color="primary"
                        fontSize="small"
                        onClick={() => HandleDeleteEvent(row._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                    {localStorage.getItem("role") === "Admin" &&
                    <IconButton
                      variant="contained"
                      color="primary"
                      fontSize="small"
                      onClick={() => HandleGetEventId(row._id)}
                    >
                      <DragIndicatorIcon />
                    </IconButton>
                    
                    }
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update</DialogTitle>
        <DialogContent>
          <DialogContentText>Update Record..</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="fname"
            name="fname"
            onChange={(e) =>
              setModelUser({ ...modelUser, fname: e.target.value })
            }
            value={modelUser.fname}
            label="First Name"
            fullWidth
          />
          <TextField
            autoFocus
            name="lname"
            margin="dense"
            id="lname"
            onChange={(e) =>
              setModelUser({ ...modelUser, lname: e.target.value })
            }
            value={modelUser.lname}
            label="Last Name"
            fullWidth
          />
          <TextField
            autoFocus
            name="email"
            margin="dense"
            id="email"
            value={modelUser.email}
            onChange={(e) =>
              setModelUser({ ...modelUser, email: e.target.value })
            }
            label="Email"
            fullWidth
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
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
          <AddUser openRole={openRole} setOpenRole={setOpenRole} />
        </DialogContent>
      </Dialog>
    </>
  );
};
export default Profile;
