import React, { useState, Fragment, useEffect } from "react";
import MyButton from "../layout/myButton";
import { withStyles } from "@material-ui/core/styles";

import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
// MUI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useSelector, useDispatch } from "react-redux";
import { postScream, clearErrors } from "../../redux/actions/dataActions";

import theme from "../../util/theme";

const styles = (theme) => ({
  ...theme,
  submitButton: {
    position: "relative",
    float: "right",
    margin: 15,
  },
  progressSpinner: {
    position: "absolute",
  },
  closeButton: {
    position: "absolute",
    top: "5%",
    left: "90%",
  },
});

function PostScream({ classes }) {
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState("");

  const { loading, errors } = useSelector((state) => state.UI);
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(postScream({ body: body }));
  }

  useEffect(() => {
    if (!errors.body && !loading) {
      setBody("");
      setOpen(false);
    }
  }, [errors]);

  return (
    <Fragment>
      <MyButton tip="Post a scream" onClick={() => setOpen(true)}>
        <AddIcon />
      </MyButton>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <MyButton
          tip="Close"
          onClick={() => {
            dispatch(clearErrors());
            setOpen(false);
          }}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogTitle>Post a new scream</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="body"
              type="text"
              label="Scream"
              multiline
              rows="3"
              placeholder="Scream away"
              error={errors.body ? true : false}
              helperText={errors.body}
              className={classes.textField}
              onChange={({ target }) => setBody(target.value)}
              fullWidth
            />
            <br />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={loading}
            >
              {!loading ? (
                "Submit"
              ) : (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export default withStyles(styles(theme))(PostScream);
