import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";

import Scream from "../components/scream/scream";
import Profile from "../components/profile/profile";
import ScreamSkeleton from "../util/screamSkeleton";

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
      return screams.map((scream) =>
        screams !== null ? (
          <Scream key={scream.screamId} scream={scream} />
        ) : (
          <ScreamSkeleton />
        )
      );
    else return <ScreamSkeleton />;
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
