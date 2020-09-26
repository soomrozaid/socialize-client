import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

import AppLogo from "../images/question.png";

import { Link } from "react-router-dom";

import theme from "../util/theme";

// MUI
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = (theme) => ({
  ...theme,
});

function Login({ classes, history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const user = useSelector((state) => state.user);
  const { loading, errors } = useSelector((state) => state.UI);

  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    const userData = {
      email: email,
      password: password,
    };
    dispatch(loginUser(userData, history));
  }

  function handleOnChange({ target: { name, value } }) {
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppLogo} alt="questions" className={classes.image} />
        <Typography variant="h2" className={classes.pageTitle}>
          Login
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
              "Login"
            )}
          </Button>
          <br />
          <small>
            Don't have an account? Sign up <Link to="signup">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles(theme))(Login);
