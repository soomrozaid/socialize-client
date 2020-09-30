import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core";
import theme from "../../util/theme";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import { useSelector, useDispatch } from "react-redux";
import { submitComment } from "../../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme,
});

function CommentForm({ classes, screamId }) {
  const [body, setBody] = useState("");
  //   const [errors, setErrors] = useState({});
  const { errors } = useSelector((state) => state.UI);
  const { authenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  //   useEffect(() => {
  //     setErrors(UI.errors);
  //   }, [UI]);

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(submitComment(screamId, { body: body }));
    setBody("");
  }

  const commentFormMarkup = authenticated ? (
    <Grid item sm={12} style={{ textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="body"
          type="text"
          label="Comment on scream"
          error={errors.comment ? true : false}
          helperText={errors.comment}
          value={body}
          onChange={({ target }) => setBody(target.value)}
          className={classes.textField}
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Submit
        </Button>
      </form>
      <hr className={classes.visibleSeperator} />
    </Grid>
  ) : null;

  return commentFormMarkup;
}

export default withStyles(styles(theme))(CommentForm);
