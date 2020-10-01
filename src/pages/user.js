import React, { useEffect, useState } from "react";
import axios from "axios";
import Scream from "../components/scream/scream";
import StaticProfile from "../components/profile/staticProfile";
import theme from "../util/theme";

import Grid from "@material-ui/core/Grid";

import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";
import { withStyles } from "@material-ui/core";
import ProfileSkeleton from "../util/profileSkeleton";

const styles = (theme) => ({
  ...theme,
});

function User(props) {
  const [profile, setProfile] = useState({});
  const [screamIdParam, setScreamIdParam] = useState(null);

  const { screams, loading } = useSelector((state) => state.data);

  const dispatch = useDispatch();

  useEffect(() => {
    const handle = props.match.params.handle;

    const screamId = props.match.params.screamId;

    if (screamId) {
      setScreamIdParam(screamId);
    }

    dispatch(getUserData(handle));
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        setProfile(res.data.user);
      })
      .catch((err) => console.log(err));
  }, [props.match.params.screamId]);

  const screamsMarkup = loading ? (
    <p>Loading Data...</p>
  ) : screams === null ? (
    <p>No screams from this user</p>
  ) : !screamIdParam ? (
    screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
  ) : (
    screams.map((scream) => {
      if (scream.screamId !== screamIdParam)
        return <Scream key={scream.screamId} scream={scream} />;
      else {
        return <Scream key={scream.screamId} scream={scream} openDialog />;
      }
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
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={profile} />
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles(theme))(User);
