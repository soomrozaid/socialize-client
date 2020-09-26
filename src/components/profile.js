import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import theme from "../util/theme";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

//Components
import EditDetails from "./editDetails";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, uploadImage } from "../redux/actions/userActions";

// MUI
import {
  Button,
  Paper,
  Typography,
} from "@material-ui/core";
import MUILink from "@material-ui/core/Link";

// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
import MyButton from "./myButton";
// import EditIcon from "@material-ui/icons/Edit";

function styles(theme) {
  return {
    ...theme,
  };
}

function Profile({ classes }) {
  const {
    credentials: { handle, createdAt, imageUrl, bio, website, location },
    loading,
    authenticated,
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  function handleImageChange(event) {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    dispatch(uploadImage(formData));
  }

  function handleLogout() {
    dispatch(logoutUser());
  }

  let profileMarkup = !loading ? (
    authenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={imageUrl} alt="profile" className="profile-image" />
            <input type="file" id="imageInput" onChange={handleImageChange} />
          </div>
          <hr />
          <div className="profile-details">
            <MUILink
              component={Link}
              to={`users/${handle}`}
              color="primary"
              variant="h5"
            >
              @{handle}
            </MUILink>
            {bio && <Typography variant="body2">{bio}</Typography>}
            <hr />
            {location && (
              <>
                <LocationOn color="primary" /> <span>{location}</span>
                <hr />
              </>
            )}
            {website && (
              <>
                <LinkIcon color="primary" />
                <a href={website} target="_blank" rel="noopener noreferrer">
                  {" "}
                  {website}
                </a>
                <hr />
              </>
            )}
            <CalendarToday color="primary" />{" "}
            <span>Joined {dayjs(createdAt).format("MMM YYYY")} </span>
          </div>
          <MyButton tip="Logout" onClick={handleLogout}>
            <KeyboardReturn color="primary" />
          </MyButton>
          <EditDetails />
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <Typography>No profile found, please login again</Typography>
        <div className={classes.button}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/signup"
          >
            Signup
          </Button>
        </div>
      </Paper>
    )
  ) : (
    <p>Loading...</p>
  );

  return profileMarkup;
}

Profile.propType = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles(theme))(Profile);
