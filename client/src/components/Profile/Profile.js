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

import ScoreCircle from "./ScoreCircle";
import { Autorenew } from "@material-ui/icons";

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
  "profile-image": {
    width: 100,
    height: 100,
  }
});

class Profile extends Component {
  render() {
    const { user, classes } = this.props;
    return (
      <Grid item xs={12} className={classes.profileWrapper}>
        <Grid item xs={2} className="image-wrapper">
          <img src={imageUrl} alt="profile" className="profile-image" backgroundSize='contain' backgroundRepeat='no-repeat'/>
        </Grid>

        <Grid item>
          <Typography variant="h4">{user.credentials.userName}</Typography>
        </Grid>

        <Grid item>
          <LocationOn />
          <Typography display="inline">Toronto, Ontario</Typography>
        </Grid>

        <Grid item className="score">
          <ScoreCircle value="86" />
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
