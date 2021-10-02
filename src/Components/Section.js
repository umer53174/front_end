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
import { Container } from "@material-ui/core";
import AddSection from "./addSection";
import AddIcon from "@material-ui/icons/Add";

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

const Section = ({ privileges, props }) => {
  const classes = useStyles();
  console.log("Privilege of Section page========", privileges);
  console.log("Section value=======", props);
  /// Update Model States///
  const [open, setOpen] = React.useState(false);
  const [openRole, setOpenRole] = React.useState(false);

  const [manageSection, setManageSection] = useState(false);
  useEffect(() => {
    if (privileges) {
      console.log("===> ", privileges["MANAGE_SECTION"]);
      setManageSection(privileges["MANAGE_SECTION"]);
    }
  }, [privileges]);

  const [modelUser, setModelUser] = useState({
    title: "",
    keys: "",
  });

  //////// Table States///
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [userCounts, setCounts] = useState();

  //////GET ROLES STATE ///
  const [Section, setSection] = useState([]);

  let keys = modelUser.keys;
  keys = keys.replace(/\s+/g, "_").toUpperCase();

  ///Update Model States Functions//

  const handleClickOpen = (row) => {
    setModelUser(row);
    setOpen(true);
  };
  ///// Updating Roles///
  const handleClose = async () => {
    setOpen(false);

    const { _id, title, keys } = modelUser;

    const res = await fetch("/updatesection", {
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

      GetSection(page, rowsPerPage);
    }
  };

  ////
  const handleCloseRoles = () => {
    setOpenRole(false);
  };

  const handleOpenRole = () => {
    setOpenRole(true);
  };

  //////// Table Function///
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    GetSection(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    GetSection(page, event.target.value);
    setPage(0);
  };

  /// {BACK END FUNCTION}///
  //// GETTING Data from BacKend///
  const GetSection = async (numberofResult, Numberofpage) => {
    const res = await fetch("/getsection", {
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
      setSection(data.section);
      setCounts(data.counts);
    }
  };

  //// DELETING Data from BacKend///
  const HandleDeleteEvent = async (id) => {
    const res = await fetch("/deletesection", {
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
      GetSection(page, rowsPerPage);
    }
  };

  useEffect(() => {
    GetSection(page, rowsPerPage);
  }, []);

  return (
    <>
      <Container>
        <h1 style={{ margin: "30px auto" }}>Manage Sections</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            padding: "0",
          }}
        >
          {manageSection.CAN_ADD && (
            <Button
              startIcon={<AddIcon />}
              style={{ color: "blue" }}
              onClick={handleOpenRole}
            >
              Add Section
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
                  Title
                </TableCell>
                <TableCell
                  align="center"
                  style={{ color: "white", fontWeight: "bold", width: "20vw" }}
                >
                  Description
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
              {Section.map((row) => (
                <TableRow key={row._id}>
                  <TableCell align="center">{row.title}</TableCell>
                  <TableCell align="center">{row.keys}</TableCell>
                  <TableCell align="center">
                    {manageSection.CAN_EDIT && (
                      <IconButton
                        variant="contained"
                        color="primary"
                        fontSize="small"
                        onClick={() => handleClickOpen(row)}
                      >
                        <EditIcon />
                      </IconButton>
                    )}
                    {manageSection.CAN_DELETE && (
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
            label="Description"
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
          <AddSection openRole={openRole} setOpenRole={setOpenRole} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Section;
