import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";

import Scream from "../components/scream/scream";
import Profile from "../components/profile/profile";

import { useSelector, useDispatch } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";

function Home() {
  const { screams, loading } = useSelector((state) => state.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getScreams());
  }, [dispatch]);

  function mapScreamsToScreen() {
    if (!loading)
      return screams.map((scream) => (
        <Scream key={scream.screamId} scream={scream} />
      ));
    else return <p>Loading...</p>;
  }

  let recentScreamsMarkup = mapScreamsToScreen();

  return (
    <div>
      <Grid container spacing={6}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
