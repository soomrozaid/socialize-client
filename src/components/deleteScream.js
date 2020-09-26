import React, { Fragment, useState } from "react";

import { withStyles } from "@material-ui/core/styles";
import MyButton from "./myButton";
import theme from "../util/theme";

// MUI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

// Icons
import DeleteOutline from "@material-ui/icons/DeleteOutline";

import { useDispatch } from "react-redux";
import { deleteScream } from "../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme,
});

function DeleteScream({ classes, screamId }) {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  function deleteThisScream() {
    dispatch(deleteScream(screamId));
    console.log(screamId);
    setOpen(false);
  }
  return (
    <Fragment>
      <MyButton
        tip="Delete Scream"
        onClick={() => setOpen(true)}
        btnClassName={classes.deleteButton}
      >
        <DeleteOutline color="secondary" />
      </MyButton>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Are your sure you want to delete this scream?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteThisScream} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default withStyles(styles(theme))(DeleteScream);
