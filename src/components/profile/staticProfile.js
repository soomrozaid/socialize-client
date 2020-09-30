import React from "react";
import { withStyles } from "@material-ui/core";
import theme from "../../util/theme";
import dayjs from "dayjs";
import MUILink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

import LocationOn from "@material-ui/icons/LocationOn";
import CalendarToday from "@material-ui/icons/CalendarToday";
import LinkIcon from "@material-ui/icons/Link";

const styles = (theme) => ({
  ...theme,
});

function StaticProfile({
  classes,
  profile: { handle, createdAt, imageUrl, bio, website, location },
}) {
  let image =
    imageUrl ??
    "https://firebasestorage.googleapis.com/v0/b/socialize-70b85.appspot.com/o/no-img.png?alt=media";
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={image} alt="profile" className="profile-image" />
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
      </div>
    </Paper>
  );
}

export default withStyles(styles(theme))(StaticProfile);
