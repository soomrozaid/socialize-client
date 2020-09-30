import React, { useState, Fragment, useEffect } from "react";
import MyButton from "../layout/myButton";
import { withStyles } from "@material-ui/core/styles";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

import theme from "../../util/theme";

// MUI
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getScream, clearErrors } from "../../redux/actions/dataActions";
import LikeButton from "./likeButton";
import CommentForm from "./commentForm";
import Comments from "./comments";

const styles = (theme) => ({
  ...theme,
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
  const [scream, setScream] = useState({});
  const [open, setOpen] = useState(false);

  const data = useSelector((state) => state.data);
  const UI = useSelector((state) => state.UI);

  const {
    id = screamId,
    body,
    createdAt,
    likeCount,
    commentCount,
    comments,
    userImage,
    handle = userHandle,
  } = scream;

  const dispatch = useDispatch();

  useEffect(() => {
    setScream(data.scream);
  }, [data]);

  function handleOpen() {
    setOpen(true);
    dispatch(getScream(screamId));
  }

  const dialogMarkup = UI.loading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={200} thickness={2} />
    </div>
  ) : (
    <Grid container spacing={10}>
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
        <LikeButton screamId={id} />
        <span>{likeCount} Likes</span>
        <MyButton tip="comment">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{commentCount} comments</span>
      </Grid>
      <hr className={classes.visibleSeperator} />
      <CommentForm screamId={screamId} />
      <Comments comments={comments} />
    </Grid>
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
          onClick={() => {
            dispatch(clearErrors());
            setOpen(false);
          }}
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
