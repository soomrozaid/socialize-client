import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { withStyles } from "@material-ui/core/styles";
import MyButton from "../layout/myButton";
import LikeButton from "./likeButton";
import DeleteScream from "./deleteScream";
import ScreamDialog from "./screamDialog";

// MUI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

import ChatIcon from "@material-ui/icons/Chat";

import { useSelector } from "react-redux";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
};

function Scream({
  classes,
  openDialog,
  scream: {
    body,
    createdAt,
    userHandle,
    userImage,
    screamId,
    likeCount,
    commentCount,
  },
}) {
  const [authenticated, setAuthenticated] = useState(false);
  const [handle, setHandle] = useState("");

  const user = useSelector((state) => state.user);

  useEffect(() => {
    setAuthenticated(user.authenticated);
    setHandle(user.credentials.handle);
  }, [user]);

  dayjs.extend(relativeTime);

  const deleteButton =
    authenticated && userHandle === handle ? (
      <DeleteScream screamId={screamId} />
    ) : null;

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.image}
        image={userImage}
        title="Profile image"
      />
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          component={Link}
          to={`/users/${userHandle}`}
          color="primary"
        >
          {userHandle}
        </Typography>
        {deleteButton}
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1" color="textPrimary">
          {body}
        </Typography>
        <LikeButton screamId={screamId} />
        <span>{likeCount} Likes</span>
        <MyButton tip="comment">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{commentCount} comments</span>
        <ScreamDialog screamId={screamId} userHandle={userHandle} openDialog={openDialog}/>
      </CardContent>
    </Card>
  );
}

export default withStyles(styles)(Scream);
