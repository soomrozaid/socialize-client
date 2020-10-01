import React, { Fragment } from "react";
import noImg from "../images/noImg.png";

// MUI
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

import theme from "./theme";
import { withStyles } from "@material-ui/core";

const styles = (theme) => ({
  ...theme,
  card: {
    display: "flex",
    marginBottom: 20,
  },
  cardContent: {
    width: "100%",
    flexDirection: "column",
    padding: 25,
  },
  cover: {
    minWidth: 200,
    objectFit: "cover",
  },
});

function ScreamSkeleton({ classes }) {
  const content = Array.from({ length: 5 }).map((item, index) => (
    <Card className={classes.card} key={index}>
      <CardMedia className={classes.cover} image={noImg} />
      <CardContent className={classes.cardContent}>
        <div className={classes.handle}></div>
        <div className={classes.date}></div>
        <div className={classes.fullLine}></div>
        <div className={classes.fullLine}></div>
        <div className={classes.halfLine}></div>
      </CardContent>
    </Card>
  ));
  return <Fragment>{content}</Fragment>;
}

export default withStyles(styles(theme))(ScreamSkeleton);
