import React from "react";
import { withStyles, Paper } from "@material-ui/core";
import theme from "./theme";
import noImg from "../images/noImg.png";

// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

const styles = (theme) => ({
  ...theme,
  handle: {
    ...theme.handle,
    height: 20,
    margin: "0 auto 7px auto",
  },
  fullLine: {
    ...theme.fullLine,
    width: "100%",
    marginBottom: 10,
  },
  halfLine: {
    ...theme.halfLine,
    width: "50%",
    marginBottom: 10,
  },
});

function ProfileSkeleton({ classes }) {
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={noImg} alt="profile" className="profile-image" />
        </div>
        <hr />
        <div className="profile-details">
          <div className={classes.handle} />
          <hr />
          <div className={classes.fullLine} />
          <div className={classes.fullLine} />
          <hr />
          <LocationOn color="primary" />
          <span> Location</span>
          <br />
          <LinkIcon color="primary" />
          <span> https://website.com</span>
          <br />
          <CalendarToday color="primary" />
          <span> Joined on</span>
        </div>
      </div>
    </Paper>
  );
}

export default withStyles(styles(theme))(ProfileSkeleton);
