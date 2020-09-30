import React, { useEffect, useState } from "react";
import axios from "axios";
import Scream from "../components/scream/scream";
import StaticProfile from "../components/profile/staticProfile";
import theme from "../util/theme";

import Grid from "@material-ui/core/Grid";

import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";
import { withStyles } from "@material-ui/core";

const styles = (theme) => ({
  ...theme,
});

function User(props) {
  const [profile, setProfile] = useState({});

  const { screams, loading } = useSelector((state) => state.data);

  const dispatch = useDispatch();

  useEffect(() => {
    const handle = props.match.params.handle;
    dispatch(getUserData(handle));
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        setProfile(res.data.user);
      })
      .catch((err) => console.log(err));
  }, []);

  const screamsMarkup = loading ? (
    <p>Loading Data...</p>
  ) : screams === null ? (
    <p>No screams from this user</p>
  ) : (
    screams.map((scream) => {
      return <Scream key={scream.screamId} scream={scream} />;
    })
  );

  return (
    <div>
      <Grid container spacing={6}>
        <Grid item sm={8} xs={12}>
          {screamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {profile === null ? (
            <p>Loading...</p>
          ) : (
            <StaticProfile profile={profile} />
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles(theme))(User);
