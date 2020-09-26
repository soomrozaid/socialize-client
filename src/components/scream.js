import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { withStyles } from "@material-ui/core/styles";
import MyButton from "./myButton";
import DeleteScream from "./deleteScream";

// MUI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

import ChatIcon from "@material-ui/icons/Chat";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

import { useSelector, useDispatch } from "react-redux";
import { likeScream, unlikeScream } from "../redux/actions/dataActions";

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
  const [likes, setLikes] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [handle, setHandle] = useState("");
  const [isLiked, setIsLiked] = useState(false);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    setLikes(user.likes);
    setAuthenticated(user.authenticated);
    setHandle(user.credentials.handle);
  }, [user, isLiked]);

  const dispatch = useDispatch();

  dayjs.extend(relativeTime);

  const likedScream = () => {
    if (likes && likes.find((like) => like.screamId === screamId)) return true;
    else return false;
  };

  const likeThisScream = () => {
    dispatch(likeScream(screamId));
    setIsLiked(true);
  };
  const unlikeThisScream = () => {
    dispatch(unlikeScream(screamId));
    setIsLiked(false);
  };

  const deleteButton =
    authenticated && userHandle === handle ? (
      <DeleteScream screamId={screamId} />
    ) : null;

  const likeButton = !authenticated ? (
    <Link to="login">
      <MyButton tip="Like">
        <FavoriteBorder color="primary" />
      </MyButton>
    </Link>
  ) : likedScream() ? (
    <MyButton tip="Undo like" onClick={unlikeThisScream}>
      <FavoriteIcon color="primary" />
    </MyButton>
  ) : (
    <MyButton tip="Like" onClick={likeThisScream}>
      <FavoriteBorder color="primary" />
    </MyButton>
  );

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
        {likeButton}
        <span>{likeCount} Likes</span>
        <MyButton tip="comment">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{commentCount} comments</span>
      </CardContent>
    </Card>
  );
}

export default withStyles(styles)(Scream);
