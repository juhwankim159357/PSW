import React, { Component } from "react";
import PropTypes from "prop-types";
// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import imageUrl from "../../images/glonn.jpg";

// Redux
import { connect } from "react-redux";

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
    const {
      classes,
      user: {
        credentials: { email, userName },
        loading,
        authenticated,
      },
    } = this.props;

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

const mapStateToProps = (state) => ({
  user: state.user,
});

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};


export default connect(mapStateToProps)(withStyles(styles)(Profile));
