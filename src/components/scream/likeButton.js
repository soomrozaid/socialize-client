import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core";
import theme from "../../util/theme";
import MyButton from "../layout/myButton";
import { Link } from "react-router-dom";

import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

import { useSelector, useDispatch } from "react-redux";
import { likeScream, unlikeScream } from "../../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme,
});

function LikeButton({ classes, screamId }) {
  const [likes, setLikes] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    setLikes(user.likes);
    setAuthenticated(user.authenticated);
  }, [user, isLiked]);

  const likedScream = () => {
    if (likes && likes.find((like) => like.screamId === screamId)) return true;
    else return false;
  };

  const likeThisScream = () => {
    setIsLiked(true);
    dispatch(likeScream(screamId));
  };
  const unlikeThisScream = () => {
    setIsLiked(false);
    dispatch(unlikeScream(screamId));
  };

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

  return likeButton;
}

export default withStyles(styles(theme))(LikeButton);
