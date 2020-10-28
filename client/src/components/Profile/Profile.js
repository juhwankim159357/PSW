import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import imageUrl from "../../images/glonn.jpg";

const styles = (theme) => ({
  ...theme.profileTheme,
  root: {
    flexGrow: 1,
  },
  profile: {
    ...theme.profileTheme.profile,
    "& .profile-details": {
      textAlign: "left",
      "& span, svg": {
        verticalAlign: "middle",
      },
      "& a": {
        color: theme.palette.primary.main,
      },
    },
  },
  resumeStuff: {},
});

class Profile extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid container item className={classes.profileWrapper}>
        <Grid container item className={classes.profileHeader}>
          <Grid
            container
            item
            className={classes.profile}
            flex-direction="column"
            alignItems="center"
          >
            <Grid item className="image-wrapper">
              <img src={imageUrl} alt="profile" className="profile-image" />
            </Grid>
            <Grid item>
              <Grid item>
                <Typography variant="h4">Chris Young-Hong</Typography>
              </Grid>
              <Grid container item flex-direction="column" alignItem="center">
                <LocationOn />
                <Typography display="inline" align="center">
                  Toronto, Ontario
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Profile);
