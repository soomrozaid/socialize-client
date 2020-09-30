import React, { useState, useEffect, Fragment } from "react";
import theme from "../../util/theme";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { editUserDetails } from "../../redux/actions/userActions";

// MUI
import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

// Icons
import EditIcon from "@material-ui/icons/Edit";
import MyButton from "../layout/myButton";

function styles(theme) {
  return {
    ...theme,
    button: {
      float: "right",
    },
  };
}

function EditDetails({ classes }) {
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [open, setOpen] = React.useState(false);

  const { credentials } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    mapUserDetailsToState(credentials);
  }, [credentials]);

  function mapUserDetailsToState(credentials) {
    setBio(credentials.bio ?? "");
    setLocation(credentials.location ?? "");
    setWebsite(credentials.website ?? "");
  }

  function handleOpen() {
    setOpen(true);
    mapUserDetailsToState(credentials);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleSubmit() {
    const userDetails = {
      bio: bio,
      website: website,
      location: location,
    };

    dispatch(editUserDetails(userDetails));
    handleClose();
  }

  return (
    <Fragment>
      <MyButton
        tip="Edit Details"
        onClick={handleOpen}
        btnClassName={classes.button}
      >
        <EditIcon color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              type="text"
              label="Bio"
              multiline
              rows="3"
              placeholder="A short bio about yourself"
              className={classes.textField}
              value={bio}
              onChange={({ target }) => setBio(target.value)}
              fullWidth
            />
            <TextField
              name="website"
              type="text"
              label="Website"
              placeholder="Your personal/professional website"
              className={classes.textField}
              value={website}
              onChange={({ target }) => setWebsite(target.value)}
              fullWidth
            />
            <TextField
              name="location"
              type="text"
              label="Location"
              placeholder="Where do you live?"
              className={classes.textField}
              value={location}
              onChange={({ target }) => setLocation(target.value)}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default withStyles(styles(theme))(EditDetails);
