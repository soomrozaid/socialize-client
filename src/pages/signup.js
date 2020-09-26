import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

import AppLogo from "../images/question.png";

import { Link } from "react-router-dom";

import theme from "../util/theme";

// MUI
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = (themeData) => ({
  ...themeData,
});

function Signup({ classes, history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [handle, setHandle] = useState("");

  // const user = useSelector((state) => state.user);
  const { loading, errors } = useSelector((state) => state.UI);

  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    const userData = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      handle: handle,
    };
    dispatch(signupUser(userData, history));
  }

  function handleOnChange({ target: { name, value } }) {
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    } else if (name === "handle") {
      setHandle(value);
    }
  }

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppLogo} alt="questions" className={classes.image} />
        <Typography variant="h2" className={classes.pageTitle}>
          Signup
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            className={classes.textField}
            helperText={errors.email}
            error={errors.email ? true : false}
            value={email}
            onChange={handleOnChange}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            className={classes.textField}
            helperText={errors.password}
            error={errors.password ? true : false}
            value={password}
            onChange={handleOnChange}
            fullWidth
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            className={classes.textField}
            helperText={errors.confirmPassword}
            error={errors.confirmPassword ? true : false}
            value={confirmPassword}
            onChange={handleOnChange}
            fullWidth
          />
          <TextField
            id="handle"
            name="handle"
            type="handle"
            label="Handle"
            className={classes.textField}
            helperText={errors.handle}
            error={errors.handle ? true : false}
            value={handle}
            onChange={handleOnChange}
            fullWidth
          />
          {errors.general && (
            <Typography variant="boby2" className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          <Button
            type="submit"
            variant="text"
            color="primary"
            className={classes.button}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={30} className={classes.progress} />
            ) : (
              "Signup"
            )}
          </Button>
          <br />
          <small>
            Already have an account? Login <Link to="login">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles(theme))(Signup);
