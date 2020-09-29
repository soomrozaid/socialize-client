import React, { useState, Fragment, useEffect } from "react";
import MyButton from "./myButton";
import { withStyles } from "@material-ui/core/styles";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

import theme from "../util/theme";

// MUI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getScream } from "../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme,
  invisibleSeperator: {
    border: "none",
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: "50%",
    objectFit: "cover",
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    left: "90%",
  },
  expandButton: {
    position: "absolute",
    left: "90%",
  },
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50,
  },
});

function ScreamDialog({ classes, screamId, userHandle }) {
  const [open, setOpen] = useState(false);
  //   const [loading, setLoading] = useState(false);
  //   const [screamData, setScreamData] = useState({});

  const {
    scream: {
      id = screamId,
      body,
      createdAt,
      likeCount,
      commentCount,
      userImage,
      handle = userHandle,
    },
  } = useSelector((state) => state.data);
  const UI = useSelector((state) => state.UI);

  const dispatch = useDispatch();

  function handleOpen() {
    setOpen(true);
    dispatch(getScream(screamId));
  }

  const dialogMarkup = UI.loading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={200} thickness={2} />
    </div>
  ) : (
    <Grid
      container
      spacing={16}
      //   justify="center"
      //   alignItems="center"
    >
      <Grid item xs={5}>
        <img
          src={userImage}
          alt="Profile"
          className={classes.profileImage}
          width="100%"
        />
      </Grid>
      <Grid item xs={7}>
        <Typography
          component={Link}
          color="primary"
          variant="h5"
          to={`/users/${handle}`}
        >
          @{handle}
        </Typography>
        <hr className={classes.invisibleSeperator} />
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
        </Typography>
        <hr className={classes.invisibleSeperator} />
        <Typography variant="body1">{body}</Typography>
      </Grid>
    </Grid>
    // <p>S</p>
  );

  return (
    <Fragment>
      <MyButton
        onClick={handleOpen}
        tip="Expand scream"
        tipClassName={classes.expandButton}
      >
        <UnfoldMore color="primary" />
      </MyButton>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <MyButton
          tip="Close"
          onClick={() => setOpen(false)}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        {/* <DialogTitle>Post a new scream</DialogTitle> */}
        <DialogContent className={classes.dialogContent}>
          {dialogMarkup}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export default withStyles(styles(theme))(ScreamDialog);
